function Client(server, io, ioclient)
{
	var self = this;
    var callbacks = [];

    self.clientDelta = 0;
    self.id = ioclient.sessionId;


    function invokeCallback(name, args) {
        if(callbacks[name]) {
            callbacks[name].forEach(function(e) { e.apply(null, args); });
		}
	}

    this.on = function(name, callback) {
		if(! callbacks[name])
			callbacks[name] = [];
		callbacks[name].add(callback);
	};

	this.off = function(name, callback) {
		if(! callbacks[name])
			return false;
        return callbacks[name].remove(callback);
	};

    function getCurrentTime() {
		return (new Date()).valueOf();
	}

    function clientToServerTime(someTime) {
        return someTime + self.clientDelta;
    }
    function serverToClientTime(someTime) {
        return someTime - self.clientDelta;
    }

    function setNetworkCallbacks() {
        ioclient.on('message', function(message) {
            if(message.ping) {
                self.sendPong(parseInt(message.ping.pingId));
            }
            else if(message.timeData) {
                var newDelta =
                    getCurrentTime() - (
                        parseInt(message.timeData.time) + parseInt(message.timeData.delta));

                self.clientDelta =
                    parseInt( (self.clientDelta + newDelta)/2 );
                console.log("Current delta for client " + self.id + " = "+ self.clientDelta);
            }
            else if(message.cursorChange) {
                var vec = new Vector(message.cursorChange.x, message.cursorChange.y);

                // sanitize cursor vector
                if( (vec.x == 1 || vec.x == 0 || vec.x == -1) &&
                    (vec.y == 1 || vec.y == 0 || vec.y == -1)) {

                    invokeCallback('cursorChange', [new Vector(message.cursorChange.x, message.cursorChange.y), parseInt(message.time)]);
                }
            }
            else if(message.kickChange) {
                invokeCallback('kickChange', [Boolean(message.kickChange.isKicking), parseInt(message.time)]);
            }
        });

        ioclient.on('disconnect', function() {
            invokeCallback('disconnect');
            server.clients.remove(self);
        });

    }
    setNetworkCallbacks();


    self.io = io;


	function getCurrentTime() {
		return (new Date()).valueOf();
	}

    function getCurrentClientTime() {
        return serverToClientTime(getCurrentTime());
    }

    self.broadcast = function(callback) {
        server.clients.forEach(function(client) {
            if(client != self)
                callback(client);
        });
    };

	self.sendPong = function(pingId) {
		ioclient.send({pong: {pingId: pingId, time: getCurrentTime()}, time: getCurrentClientTime()});
	};

    self.sendNewPlayer = function(player) {
        console.log("sending new player event to " + self.id);
        ioclient.send({newPlayer: {id: player.id, name: player.name, position: player.position.toStruct()}, time: getCurrentClientTime()});
    };

    self.sendFullState = function(fullState) {
        console.log("sent full state! ");
        ioclient.send({fullState: {state: fullState}, time: getCurrentClientTime()});
    };
    self.sendOtherKickChange = function(id, isKicking) {
        ioclient.send({otherKickChange: {id: id, isKicking: isKicking}, time: getCurrentClientTime()});
    };
    self.sendOtherCursorChange = function(id, cursorChange) {
        ioclient.send({otherCursorChange: {id: id, cursorChange: cursorChange}, time: getCurrentClientTime()});
    };

    self.sendPlayerDisconnected = function(id) {
        ioclient.send({playerDisconnected: {id: id}});
    };

	self.on('message', function(msg) {
		console.log(msg);
	});

}
module.exports=Client;