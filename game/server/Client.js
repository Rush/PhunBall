function Client(io, ioclient)
{
	var self = this;
	self.io = io;
	self.sessionId = ioclient.sessionId;
	self.on = function(event, callback) { ioclient.on(event, callback); };


	function getCurrentTime() {
		return (new Date()).valueOf();
	}
	self.sendPong = function(pingId) {
		console.log("send pong!");
		ioclient.send({pong: {pingId: pingId, time: getCurrentTime()}});
	}

	self.on('message', function(msg) {
			
			console.log(msg);
		});

}
module.exports=Client;