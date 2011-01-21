var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , io = require('../node-bin')
  , sys = require(process.binding('natives').util ? 'util' : 'sys')
  , server;

require.paths.unshift("./client/scripts/");
var Vector = require('Vector');


send404 = function (res)
{
	res.writeHead(404);
	res.write('404');
	res.end();
};

function sendFile(path, res)
{
	fs.readFile(__dirname + path,
				function (err, data)
				{
					if (err)
						return send404(res);
					res.writeHead(200, { 'Content-Type': path.substring(path.length - 3, path.length) == '.js' ? 'text/javascript' : 'text/html' });					res.write(data, 'utf8');
					res.end();
				});
}

server = http.createServer(function (req, res)
{
	// your normal server code
	var path = url.parse(req.url).pathname;
	switch (path)
	{
		case '':
		case '/':
			sendFile('/client/index.html', res);
			break;
		case '/log':
			res.writeHead(200, { 'Content-Type': 'text/html' });
			fs.readFile(__dirname + "/node.log",
						function (err, data)
						{
							if (err)
								return send404(res);
							res.writeHead(200, { 'Content-Type': 'text/html' });
							res.write("<html><head><title>Output log</title></head><body><pre>");
							res.write(data, 'utf8');
							res.write("</pre></body></html>");
							res.end();
						})
			break;
		default:
			sendFile('/client/' + path, res);
	}
});



server.listen(8081);

var io = io.listen(server);
var tick = 0;

var ballState = { position: { x: 250, y: 300} };
var playersState = [];
var playerList = [];

function worldUpdate()
{

	tick++;
}


var FIELD_WIDTH = 640;
var FIELD_HEIGHT = 408;
var PLAYER_RADIUS = 16;

function statesCollide(state1, state2)
{
	var dx = state1.x - state2.x;
	var dy = state1.y - state2.y;

	if (dx * dx + dy * dy < PLAYER_RADIUS * PLAYER_RADIUS)
		return true;
	return false;
}

function stateCollides(state)
{
	for (i = 0; i < playerList.length; ++i)
	{
		if (statesCollide(state, playersState[playerList[i]]))
			return true;
	}
	return false;
}

function newPlayerState()
{
	var state;

	do
	{
		state = { x: parseInt(PLAYER_RADIUS * 3 + Math.random() * (FIELD_WIDTH - PLAYER_RADIUS * 3)),
			y: parseInt(PLAYER_RADIUS * 3 + Math.random() * (FIELD_HEIGHT - PLAYER_RADIUS * 3))
		};
	} while (stateCollides(state));
	return state;
}

setInterval(worldUpdate, 1);

io.on('connection', function (client)
{

	client.ip = client.connection.remoteAddress;

	var myPlayersState = [];
	for (i = 0; i < playerList.length; ++i)
	{
		myPlayersState[i] = { id: playerList[i], state: playersState[playerList[i]] };
	}

	client.send({ playersState: myPlayersState });


	playersState[client.sessionId] = newPlayerState();
	playerList[playerList.length] = client.sessionId;


	io.broadcast({ playerConnected: {
		id: client.sessionId,
		num: playerList.length - 1,
		state: playersState[client.sessionId]
	}
	});

	function updateStuff()
	{


		client.updateInterval = setTimeout(updateStuff, 20);
	}
	client.updateInterval = setTimeout(updateStuff, 20);

	client.on('message', function (message)
	{
		if (message.stateUpdate)
		{
			message.id = client.sessionId;
			client.broadcast(message);
		}
	});

	client.on('disconnect', function ()
	{
		client.broadcast({ playerDisconnected: { id: client.sessionId} });
		clearTimeout(client.updateInterval);

		playersState[client.sessionId] = undefined;
		for (var i in playerList)
		{
			if (playerList[i] == client.sessionId)
			{
				playerList.splice(i, 1);
				break;
			}
		}
	});
});
