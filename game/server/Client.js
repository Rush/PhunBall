function Client(io, ioclient)
{
	var self = this;
    var callbacks = [];

    self.clientDelta = 0;

    function invokeCallback(name, args) {
		if(callbacks[name]) {
			for(i = 0;i < callbacks[name].length;++i) {
				callbacks[name][i].apply(null, args);
			}
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
		for(i = 0;i < callbacks[name].length;++i) {
			if(callbacks[name][i] == callback) {
				callbacks[name].removeAt(i);
				return true;
			}
		}
		return false;
	};

    function getCurrentTime() {
		return (new Date()).valueOf();
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
                console.log("Current delta " + self.clientDelta);
            }

        });
    }
    setNetworkCallbacks();


    self.io = io;
	self.sessionId = ioclient.sessionId;
	self.on = function(event, callback) { ioclient.on(event, callback); };


	function getCurrentTime() {
		return (new Date()).valueOf();
	}
	self.sendPong = function(pingId) {
		console.log("send pong! " + pingId);
		ioclient.send({pong: {pingId: pingId, time: getCurrentTime()}});
	};

	self.on('message', function(msg) {

			console.log(msg);
		});

}
module.exports=Client;