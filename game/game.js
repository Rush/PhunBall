var socket = new io.Socket(null, {port: 8081, rememberTransport: false});
/*	transports: [ 'websocket', 'flashsocket', 'htmlfile', 'xhr-multipart',
	'xhr-polling' ]}); */
function logMsg(text) {
	$('#console').append("<span>" + text + "</span>\n");
}

socket.on('connect', function() {
		logMsg("Connected to server");
	});
socket.connect();
socket.on('message', function(message){
		if(message.playerConnected) {
			logMsg("Player " + message.playerConnected.id + " joined at x=" + message.playerConnected.state.x + " y=" + message.playerConnected.state.y);
			
		}
		else if(message.playersState) {
			var pState = message.playersState;
			var text = "All players: ";
			for(i = 0;i < pState.length;++i) {
				text += pState[i].id + "("+ pState[i].state.x + "," + 
					pState[i].state.y
					+ ") "
					}
			logMsg(text);
		}
		else if(message.playerDisconnected) {
			logMsg("Player " + message.playerDisconnected.id + " disconnected");
		}
	});


