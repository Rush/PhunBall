var socket = new io.Socket(null, {port: 8081, rememberTransport: false});
/*	transports: [ 'websocket', 'flashsocket', 'htmlfile', 'xhr-multipart',
	'xhr-polling' ]}); */

socket.on('connect', function() {
		onConnected();
	});
socket.connect();
socket.on('message', function(message){
		if(message.playerConnected) {
			logMsg("Player " + message.playerConnected.id + " joined at x=" + message.playerConnected.state.x + " y=" + message.playerConnected.state.y);
			
		}
		else if(message.playersState) {
			onPlayersState(message.playersState);
		}
		else if(message.playerDisconnected) {
			onPlayerDisconnected(message.playerDisconnected.id);
		}
	});


