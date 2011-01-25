/// <reference path="Common.js" />
/// <reference path="Vector.js" />
/// <reference path="Ball.js" />
/// <reference path="Player.js" />
/// <reference path="Field.js" />
/// <reference path="Network.js" />
/// <reference path="Simulation.js" />

function logMsg(text)
{
	$('#console').append("<span>" + text + "</span>\n");
}

$(function ()
{
	var context = $('#field')[0].getContext('2d');
	var width = $('#field').width();
	var height = $('#field').height();
	var field = new Field(width, height);
	var simulation = new Simulation(field);
	var lastTime = new Date();
	var playerConnected = false;
	var move = new Vector();
	var selfId = 0;

	var left, up, rigth, down;

	left = up = right = down = false;

	$(document).bind("keydown keyup", function (event)
	{
		if (event.keyCode >= Key.Left && event.keyCode <= Key.Down)
		{
			var value = event.type == 'keydown';

			if (event.keyCode == Key.Left)
				left = value;
			else if (event.keyCode == Key.Up)
				up = value;
			else if (event.keyCode == Key.Right)
				right = value;
			else if (event.keyCode == Key.Down)
				down = value;

			/*var newCursVec = getCursorVector();

			if (cursVec.toString() != newCursVec.toString())
			{
			//socket.send({ stateUpdate: newCursVec });

			}
			cursVec = newCursVec;*/

			move.x = right ^ left ? (right ? 1 : -1) : 0;
			move.y = down ^ up ? (down ? 1 : -1) : 0;
			move.normalize();

			return false;
		}
	});

	/*function onPlayerConnected(id, x, y)
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
	}*/

	var network = new Network();

	network.connect(null, 8081);

	var pingInterval;

	network.on('connect', function ()
	{
		logMsg("Connected to server");
		pingInterval = setInterval(function() {
				network.sendPing(function(diff) { logMsg(diff)});
			}, 1000);
	});

	network.on('disconnect', function ()
	{
		logMsg("Disconnected from server");
		clearInterval(pingInterval);
	});

	

	/*network.on('message', function (message)
	{
	if (message.hello)
	{
	selfId = message.hello;
	}
	else if (message.playerConnected)
	onPlayerConnected(message.playerConnected.id, message.playerConnected.state.x, message.playerConnected.state.y);
	else if (message.playersState)
	onPlayersState(message.playersState);
	else if (message.playerDisconnected)
	onPlayerDisconnected(message.playerDisconnected.id);
	else if (message.playersStateUpdate)
	{

	var states = message.playersStateUpdate;
	for (i = 0; i < states.length; ++i)
	{
	var id = states[i].id;
	var state = states[i].state;
	if (id == selfId)
	{
	field.setSelfPosition(new Vector(state.x, state.y));
	}
	else
	field.setPlayerPosition(id, new Vector(state.x,state.y));
	}
	}

	});*/

	// main loop

	setInterval(function ()
	{
		var now = new Date();
		var time = (now.valueOf() - lastTime.valueOf()) / 1000;
		lastTime = now;

		var force = 1000 * time;

		simulation.applyForce(move.x * force, move.y * force);
		simulation.update(time);

		field.draw(context);

	}, 10);
});