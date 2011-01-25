function Network()
{
	var self = this;
	
	var socket;

	var callbacks = [];

	self.serverDelta = 0;

	function invokeCallback(name, args) {
		if(callbacks[name]) {
			for(i = 0;i < callbacks[name].length;++i) {
				callbacks[name][i].apply(null, args);
			}
		}
	}

	function setNetworkCallbacks(socket) {
		socket.on('connect', function() {
			connected = true;
			invokeCallback('connect', null);
			
		});
		socket.on('disconnect', function() {
			connected = false;
			invokeCallback('disconnect', null);
		});
		socket.on('message', function(message) {
			if(message.ping) {
				var time = parseInt(message.ping.time);
				socket.send({pong: {time: time, serverDelta: 0}});
			}
			if(message.pong) {
				invokeCallback('pong', [parseInt(message.pong.pingId), message.pong.time]);
			}
		});
		
	}

	this.connect = function(host, port) {
		socket = new io.Socket(host, {
			port: port,
			//transports: ['websocket', 'flashsocket', 'htmlfile', 'xhr-multipart', 'xhr-polling']},
			rememberTransport: false
			});
		socket.connect();
		setNetworkCallbacks(socket);

	}

	this.disconnect = function() {
		socket = undefined;
		callbacks = undefined;
	}

	this.on = function(name, callback) {
		if(! callbacks[name])
			callbacks[name] = [];
		callbacks[name].push(callback);
	}
	
	this.off = function(name, callback) {
		if(! callbacks[name])
			return false;
		for(i = 0;i < callbacks[name].length;++i) {
			if(callbacks[name][i] == callback) {
				callbacks[name].removeAt(i)
				return true;
			}
		}
		return false;
	}

	self.connected = false;

	function getCurrentTime() {
		return (new Date()).valueOf();
	}

	this.sendPing = function(callback) {

		var pingId = parseInt(Math.random() * 65000);
		var time = getCurrentTime();
		socket.send({ping: {pingId: pingId, time: time}});

		var f;
		self.on('pong', f = function(gotPingId, serverTime) {
			if(gotPingId == pingId) {
				callback(getCurrentTime() - time);
				self.off('pong', f);
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
