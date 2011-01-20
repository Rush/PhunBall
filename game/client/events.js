
function logMsg(text) {
	$('#console').append("<span>" + text + "</span>\n");
}

function onConnected() {
	logMsg("Connected to server");
}

function onPlayerConnected(id, x, y)  {
	logMsg("Player " + id + " joined at x=" + x + " y=" + y);	
}

/*
  playersState = [{id, x, y},  ]
 */
function onPlayersState(playersState)
{
	var pState = playersState;
	var text = "All players: ";
	for(i = 0;i < pState.length;++i) {
		text += pState[i].id + "("+ pState[i].state.x + "," + 
			pState[i].state.y
			+ ") "
			}
	logMsg(text);
}

function onPlayerDisconnected(id) {
	logMsg("Player " + id + " disconnected");
}