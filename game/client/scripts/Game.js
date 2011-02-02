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

	var fullStateCounter = 0;

	var myId = 0;

	function initialize()
	{
		function logMsg(text)
		{
			$('#console').append("<span>" + text + "</span>\n");
		}

		network.connect(null, 8081);

		var pingInterval;
		var pingSpan = $('#ping');

		network.on('connect', function (id)
		{
			myId = id;
			logMsg("Connected to server with id " + id);

			pingInterval = setInterval(function ()
			{
				network.sendPing(function (diff)
				{
					pingSpan.text(diff);
				});
			}, 1000);

			fullStateCounter = 0;
		});

		network.on('disconnect', function ()
		{
			logMsg("Disconnected from server");

			clearInterval(pingInterval);
		});

		network.on('newPlayer', function (player, time)
		{
			logMsg("New player connected with id " + player.id + " name " + player.name);
			var p = new Player(player.id, player.name, new Vector(player.position));
			field.addPlayer(p);
		});

		network.on('playerDisconnected', function (id)
		{
			var p = field.getPlayerById(id);
			field.removePlayer(p);
			logMsg("Player " + p.id + " disconnected");
		});

		network.on('otherCursorChange', function (id, cursorChange)
		{
			var player = field.getPlayerById(id);
			player.cursor.set(cursorChange);
		});

		network.on('fullState', function (fullState)
		{
			if (fullStateCounter++ == 0)
			{
				// first full state received
				var msg = "Got full state, players: ";
				
				fullState.state.forEach(function (e)
				{
					msg += e.id + ", ";
					
					var player = new Player(e.id, e.name, new Vector(e.position));
					
					field.addPlayer(player);
					
					if (e.id == myId)
						field.player = player;
				});

				logMsg(msg);
			}
			else
			{
				fullState.state.forEach(function (e)
				{
					var p = field.getPlayerById(e.id);
					p.position.set(e.position);
					p.velocity.set(e.velocity);
				});
			};
		});
	}

	function update(time)
	{
		var move = input.getMovement();

		field.player.cursor.set(move);

		if (!lastMove.equals(move))
		{
			network.sendCursorChange(move);
			lastMove.set(move);
			//setTimeout(function() {
			//      field.player.cursor.set(move);
			// }, currentPing/2);
		}

		field.players.forEach(function (player)
		{
			if (!player.cursor.empty())
				simulation.applyForce(player, player.cursor, time);
		});

		simulation.update(time);
	}

	function draw()
	{
		renderer.drawField(field.width, field.height);
		renderer.drawPlayer(field.player, true);

		field.players.forEach(function (p)
		{
			renderer.drawPlayer(p, false);
		});

		renderer.drawBall(field.ball);
	}

	// main
	initialize();

	var acc = 0;
	setInterval(function ()
	{
		var now = new Date();
		var time = (now.valueOf() - lastTime.valueOf()) / 1000;
		lastTime = now;
		acc += time;
		while (acc >= 0.001)
		{
			update(0.001);
			acc -= 0.001;
		}
		draw();
	}, 10);
});
