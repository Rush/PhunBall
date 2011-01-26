/// <reference path="Common.js" />
/// <reference path="Vector.js" />
/// <reference path="Models/Ball.js" />
/// <reference path="Models/Player.js" />
/// <reference path="Models/Field.js" />
/// <reference path="Renderers/CanvasRenderer.js" />
/// <reference path="Inputs/KeyboardInput.js" />
/// <reference path="Network.js" />
/// <reference path="Simulation.js" />

$(function ()
{
	var width = $('#field').width();
	var height = $('#field').height();
	var field = new Field(width, height);
	var simulation = new Simulation(field);
	var renderer = new CanvasRenderer($('#field')[0]);
	var network = new Network();
	var input = new KeyboardInput();
	var lastTime = new Date();
	var lastMove = new Vector();

	function initialize()
	{
		function logMsg(text)
		{
			$('#console').append("<span>" + text + "</span>\n");
		}

		network.connect(null, 8081);

		var pingInterval;
		var pingSpan = $('#ping');

		network.on('connect', function ()
		{
			logMsg("Connected to server");

			pingInterval = setInterval(function ()
			{
				network.sendPing(function (diff)
				{
					pingSpan.text(diff);
				});
			}, 1000);
		});

		network.on('disconnect', function ()
		{
			logMsg("Disconnected from server");

			clearInterval(pingInterval);
		});
	}

	function update(time)
	{
		var move = input.getMovement();

		if (!lastMove.equals(move))
		{
			network.sendCursorChange({ x: move.x, y: move.y });
			lastMove.x = move.x;
			lastMove.y = move.y;
		}

		if (move.x != 0 || move.y != 0)
			simulation.applyForce(move, time);

		// 'move' is being changed by applyForce

		simulation.update(time);
	}

	function draw()
	{
		renderer.drawField(field.width, field.height);
		renderer.drawPlayer(field.player.position, true);

		field.players.forEach(function (p)
		{
			renderer.drawPlayer(p, false);
		});

		renderer.drawBall(field.ball.position);
	}

	// main

	initialize();

	setInterval(function ()
	{
		var now = new Date();
		var time = (now.valueOf() - lastTime.valueOf()) / 1000;
		lastTime = now;

		update(time);
		draw();
	}, 10);

});
