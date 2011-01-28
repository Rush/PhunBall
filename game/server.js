function globalInclude(className)
{
	var something = require(className);
	global[className] = something;
}

require.paths.unshift("./client/scripts/");
require.paths.unshift("./client/scripts/Models");
require.paths.unshift("./server/");

globalInclude('Vector');
globalInclude('Ball');
globalInclude('Player');
globalInclude('Field');

/* extend original Array class for methods such as removeAt */
require('Acx/Array');
require('Acx/Common');

var Server = require('Server');
var Simulation = require('Simulation');

var server = new Server;
server.listen(8081);
server.basePath = __dirname;

var width = 840;
var height = 408;
var field = new Field(840, 408);
var simulation = new Simulation(field);


var lastTime = new Date();
setInterval(function() {
    var now = new Date();
	var time = (now.valueOf() - lastTime.valueOf()) / 1000;
	lastTime = now;

    field.players.forEach(function(player) {
        if(player.cursor.x != 0 || player.cursor.y != 0) {
            simulation.applyForce(player, player.cursor, time);
        }
    });

    simulation.update(time);
}, 100);


setInterval(function() {
    var state = createFullState(field);
    server.broadcast( function(client) {client.sendFullState(state);});
}, 1000);

function createFullState(field)
{
    return field.players.map( function(e) { return {id: e.id, name: e.name, position: e.position, velocity: e.velocity}; });;
}


function allocatePlayer(client)
{
	return new Player(client.id, client.id.toString(), new Vector(Math.random() * width, Math.random() * height));
}

server.on('connection', function (client)
{
	console.log(client.id + " Connected");

	field.players.add(client.player = allocatePlayer(client));

    client.player.cursor = new Vector(0, 0);

    var state = createFullState(field);
    console.log(state);
    client.sendFullState(state);

	client.broadcast(function (other) { other.sendNewPlayer(client.player); });

    /* TODO: guard against DoS message spamming here since one message gets multiplied
     * for all the other clients.
     */

    client.on('kickChange', function(isKicking, time) {
        client.broadcast(function(other) { other.sendOtherKickChange(client.id, isKicking);});
        field.getPlayerById(client.id).isKicking = isKicking;
    });
    client.on('cursorChange', function(cursorChange, time) {
        client.broadcast(function(other) { other.sendOtherCursorChange(client.id, cursorChange);});
        client.player.cursor = cursorChange;
        console.log("broadcast cursorChange " + cursorChange.x + " " + cursorChange.y);
    });

	client.on('disconnect', function () {
		field.players.remove(client.player);
		console.log(client.id + " Disconnected");
        server.broadcast(function(c) {c.sendPlayerDisconnected(client.id);});
	});
});

var stdin = process.openStdin();

stdin.on('data', function (chunk)
{
	if (chunk == "exit\n")
	{
		process.exit(0);
	}
});

/*var tick = 0;

var ballState = { position: { x: 250, y: 300} };
var playersState = [];
var playerList = [];

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
state.cursorVector = new Vector(0, 0);
return state;
}

Math.clamp = function(valMin, valMax, val) { return Math.max(valMin, Math.min(valMax, val));}


function getMovementVector(time, move)
{
return move.normalize().mul(playerSpeed * time);
}

function movePlayer(state, v)
{
var pVec = (new Vector(state.x, state.y)).add(v);
pVec.x = Math.clamp(0, FIELD_WIDTH, pVec.x);
pVec.y = Math.clamp(0, FIELD_HEIGHT, pVec.y);
state.x = pVec.x;
state.y = pVec.y;
}

var lastTime = new Date();
function worldUpdate()
{
var now = new Date();
var time = (now.valueOf() - lastTime.valueOf()) / 1000;
lastTime = now;

for(i = 0;i < playerList.length;++i) {
var state = playersState[playerList[i]];

var moveVec = getMovementVector(time, state.cursorVector);
//		console.log([moveVec.x, moveVec.y]);
movePlayer(state, moveVec);
//		console.log([state.x, state.y]);
}

tick++;
}

setInterval(worldUpdate, 1);

var playerSpeed = 200;



setInterval(function() {
var myPlayersState = [];
for (i = 0; i < playerList.length; ++i)
{
myPlayersState[i] = { id: playerList[i], state:
{x: playersState[playerList[i]].x|0,
y: playersState[playerList[i]].y|0}

};
}
io.broadcast({ playersStateUpdate: myPlayersState });
}, 50);
*/


/*io.on('connection', function (client)
{
if(client.connection)
client.connection.setNoDelay(true);

client.ip = client.connection.remoteAddress;

var myPlayersState = [];
for (i = 0; i < playerList.length; ++i)
{
myPlayersState[i] = { id: playerList[i], state: playersState[playerList[i]] };
}


client.send({hello: client.sessionId});

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
try {

if (message.stateUpdate)
{
message.id = client.sessionId;
//			client.broadcast(message);
var playerState = playersState[message.id];
playerState.cursorVector =
new Vector(message.stateUpdate.x, message.stateUpdate.y);
//			console.log(message.stateUpdate);

}
} catch(err) {
console.log("Exception: '" + err.description + "' on client message.");
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
});*/