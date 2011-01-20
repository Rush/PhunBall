function updatePlayer(id, x, y)
{
	$('#player-' + id).css({ left: x - 16, top: y - 16 });
}

function addPlayer(id, x, y)
{
	$('<div id="player-' + id + '" class="player"></div>').appendTo('#field');
	updatePlayer(id, x, y);
}

function removePlayer(id)
{
	$('#player-' + id).remove();
}

function logMsg(text)
{
	$('#console').append("<span>" + text + "</span>\n");
}

function onConnected()
{
	logMsg("Connected to server");
}

function onDisconnected()
{
	logMsg("Disconnected from server");
}

var playerConnected = false;

function onPlayerConnected(id, x, y)
{
	logMsg("Player " + id + " joined at x=" + x + " y=" + y);
	
	if (!playerConnected)
	{
		var p = getPlayer();
		p.position.x = x;
		p.position.y = y;
		playerConnected = true;
	}
	else
	{
		addPlayer(id, x, y);
	}
}

/*
playersState = [{id, x, y},  ]
*/
function onPlayersState(playersState)
{
	var pState = playersState;
	var text = "All players: ";
	for (i = 0; i < pState.length; ++i)
	{
		var state = pState[i];

		text += pState[i].id + "(" + pState[i].state.x + "," +
			pState[i].state.y
			+ ") ";

		addPlayer(state.id, state.x, state.y);
	}
	logMsg(text);
}

function onPlayerDisconnected(id)
{
	logMsg("Player " + id + " disconnected");

	removePlayer(id);
}