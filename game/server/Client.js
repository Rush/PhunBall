function Client(server, io, ioclient)
{
	var self = this;
    var callbacks = [];

    self.clientDelta = 0;
    self.id = ioclient.sessionId;;


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
        });
//        	self.on = function(event, callback) { ioclient.on(event, callback); };
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
        for(i = 0;i < server.clients.length;++i) {
            if(server.clients[i] != self) {
                callback(server.clients[i]);
            }
        }
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


	self.on('message', function(msg) {
		console.log(msg);
	});

}
module.exports=Client;