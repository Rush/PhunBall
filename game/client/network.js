
var socket = new io.Socket(null, {
	port: 8081,
	//transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling']},
	rememberTransport: false 
});

socket.on('connect', function ()
{
	onConnected();
});

socket.on('disconnect', function ()
{
	onDisconnected();
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