function Network()
{
	this.self = this;
	
	var socket;

	this.connect = function(host, port) {
		socket = new io.Socket(host, {
			port: port,
			//transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling']},
			rememberTransport: false
			});
		socket.on('connected', function() { connected = true; });
		socket.on('disconnected', function() { connected = false; });

	}

	this.disconnect = function() {
		socket = undefined;
	}

	this.on = function (name, callback)
	{
		/// <summary>Bind handler to message</summary>
		/// <param name="name" type="String">connect, disconnect</param>
		socket.on(name, callback);		
	}
	
	self.connected = false;

	this.ping = function(callback) {
		var pingId = Math.random() * 65000;
		var time = new Time().valueOf;
		socket.send({ping: pingId});
		socket.on('message', function(message) {
				if(message.ping) {
					if(message.ping == pingId) {
						var time2 = new Time().valueOf;
						callback(time2 - time);
					}
				}
			});	
	}
	this.sendCursorChange = function(vector) {
		socket.send({cursorVector: {x: vector.x, y: vector.y}});
	}
	this.sendKickChange = function(isKicking) {
		socket.send({kick: isKicking});
	}


}