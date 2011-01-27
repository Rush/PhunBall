function Network()
{
	var self = this;
	var callbacks = [];
    var socket;

	self.serverDelta = 0;

    function invokeCallback(name, args) {
        if(callbacks[name]) {
            callbacks[name].forEach(function(e) { e.apply(null, args); });
		}
	}

    this.on = function(name, callback) {
		if(! callbacks[name])
			callbacks[name] = [];
		callbacks[name].push(callback);
	};

	this.off = function(name, callback) {
		if(! callbacks[name])
			return false;
		return callbacks[name].remove(callback);
	};

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
			else if(message.pong) {
				invokeCallback('pong', [parseInt(message.pong.pingId), parseInt(message.pong.time), parseInt(message.time)]);
			}
            else if(message.fullState) {
                invokeCallback('fullState', [message.fullState, parseInt(message.time)]);
            }

            else if(message.newPlayer) {
                invokeCallback('newPlayer', [message.newPlayer, parseInt(message.time)]);
            }
            else if(message.otherKickChange) {
                invokeCallback('otherKickChange', [message.id, message.isKicking]);
            }
            else if(message.otherCursorChange) {
                invokeCallback('otherCursorChange', [message.id, message.cursorChange]);
            }

		});

	}

	this.connect = function(host, port) {
		socket = new io.Socket(host, {
			port: port,
			transports: ['websocket', 'flashsockett', 'htmlfile', 'xhr-multipart', 'xhr-polling'],
			rememberTransport: false
			});
		socket.connect();
		setNetworkCallbacks(socket);

	};

	this.disconnect = function() {
		socket = undefined;
		callbacks = undefined;
	};

	self.connected = false;

	function getCurrentTime() {
		return (new Date()).valueOf();
	}

	this.sendPing = function(callback) {

		var pingId = parseInt(Math.random() * 65000);
        var time = getCurrentTime();
		socket.send({ping: {pingId: pingId}, time: time});

		var f;
		self.on('pong', f = function(gotPingId, serverTime) {
			if(gotPingId == pingId) {
                var delta = getCurrentTime() - time;
				callback(delta);
                socket.send({timeData: {delta: delta, time: getCurrentTime()}});
				self.off('pong', f);
			}
		});

	};
	this.sendCursorChange = function(vector) {
		socket.send({cursorChange: {x: vector.x, y: vector.y}, time: getCurrentTime()});
	};
	this.sendKickChange = function(isKicking) {
		socket.send({kick: {isKicking: isKicking}, time: getCurrentTime()});
	};

}
