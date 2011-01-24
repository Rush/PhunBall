function Client(io, ioclient)
{
	var self = this;
	self.io = io;
	self.sessionId = ioclient.sessionId;
	self.on = function(event, callback) { ioclient.on(event, callback); };
}
module.exports=Client;