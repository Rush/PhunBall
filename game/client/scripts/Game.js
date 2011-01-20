/// <reference path="jquery.js" />
/// <reference path="Vector.js" />
/// <reference path="Ball.js" />
/// <reference path="Player.js" />
/// <reference path="Field.js" />

$(function ()
{
	var context = $('#field')[0].getContext('2d');
	var width = $('#field').width();
	var height = $('#field').height();
	var field = new Field(width, height);
	var lastTime = new Date();
	var playerConnected = false;
	var moveVec = new Vector();
	var playerSpeed = 200;

	var left, up, rigth, down;

	left = up = right = down = false;

	$(document).bind("keydown keyup", function (event)
	{
		var value = event.type == 'keydown';

		if (event.keyCode >= Key.Left && event.keyCode <= Key.Down)
		{
			if (event.keyCode == Key.Left)
				left = value;
			else if (event.keyCode == Key.Up)
				up = value;
			else if (event.keyCode == Key.Right)
				right = value;
			else if (event.keyCode == Key.Down)
				down = value;

			return false;
		}
	});

	function logMsg(text)
	{
		$('#console').append("<span>" + text + "</span>\n");
	}

	function onPlayerConnected(id, x, y)
	{
		logMsg("Player " + id + " joined at x=" + x + " y=" + y);

		if (!playerConnected)
		{
			var p = field.player;
			p.position.x = x;
			p.position.y = y;
			playerConnected = true;
		}
		else
		{
			field.addPlayer(id, x, y);
		}
	}

	// playersState = [{id, x, y}, ... ]
	function onPlayersState(playersState)
	{
		var text = "All players: ";

		for (i = 0; i < playersState.length; ++i)
		{
			var p = playersState[i];

			text += p.id + "(" + p.state.x + "," + p.state.y + ") ";

			field.addPlayer(p.id, p.state.x, p.state.y);
		}

		logMsg(text);
	}

	function onPlayerDisconnected(id)
	{
		logMsg("Player " + id + " disconnected");

		field.removePlayer(id);
	}

	// socket

	var socket = new io.Socket(null, {
		port: 8081,
		//transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling']},
		rememberTransport: false
	});

	socket.on('connect', function ()
	{
		logMsg("Connected to server");
	});

	socket.on('disconnect', function ()
	{
		logMsg("Disconnected from server");
	});

	socket.on('message', function (message)
	{
		if (message.playerConnected)
			onPlayerConnected(message.playerConnected.id, message.playerConnected.state.x, message.playerConnected.state.y);
		else if (message.playersState)
			onPlayersState(message.playersState);
		else if (message.playerDisconnected)
			onPlayerDisconnected(message.playerDisconnected.id);
	});

	socket.connect();

	// main loop

	function getMovementVector(time)
	{
		var move = new Vector();

		move.x = right ^ left ? (right ? 1 : -1) : 0;
		move.y = down ^ up ? (down ? 1 : -1) : 0;

		return move.normalize().mul(playerSpeed * time);
	}

	setInterval(function ()
	{
		var now = new Date();
		var time = (now.valueOf() - lastTime.valueOf()) / 1000;
		lastTime = now;

		var movement = getMovementVector(time);

		field.movePlayer(movement);
		field.update(time);
		field.draw(context);
	}, 10);
});