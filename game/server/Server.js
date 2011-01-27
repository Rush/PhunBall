var http = require('http')
, url = require('url')
, fs = require('fs')
, io = require('../../node-bin');

var Client = require("Client");

var extMatch = /.*\.(.*)/;

function Server(port)
{
	var self = this;
    this.clients = [];

	send404 = function (res)
	{
		res.writeHead(404);
		res.write('404');
		res.end();
	};
	function sendFile(path, res)
	{
		function file2mime(filename) {
			switch(extMatch.exec(filename)[1]) {
			case 'js':
				return 'text/javascript';
			case 'css':
				return 'text/css';
			case 'png':
				return 'image/png';
			default:
				return 'text/html';
			}
		}
		fs.readFile(self.basePath + path,
					function (err, data)
					{
						if (err) {
                         	send404(res);
                            return;
                        }
						res.writeHead(200, { 'Content-Type': file2mime(path) });
						res.write(data, 'utf8');
						res.end();
					});
	}

	server = http.createServer(
		function (req, res)
		{
			// your normal server code
			var path = url.parse(req.url).pathname;
			switch (path)
			{
			case '':
			case '/':
				sendFile('/client/index.html', res);
				break;
			default:
				sendFile('/client' + path, res);
				break;
			case '/log':
				res.writeHead(200, { 'Content-Type': 'text/html' });
				fs.readFile(__dirname + "/node.log",
							function (err, data)
							{
								if(err) {
                                    send404(res);
                                    return;
                                }
								res.writeHead(200, { 'Content-Type': 'text/html' });
								res.write("<html><head><title>Output log</title></head><body><pre>");
								res.write(data, 'utf8');
								res.write("</pre></body></html>");
								res.end();
							});
				break;
			}
		});


	function setNetworkCallbacks(client) {
		client.on('ping', function(pingId, clientTime) {
			client.sendPong(pingId);
		});
	}

	this.addClient = function(client) {
        self.clients.push(client);
    };
    this.removeClient = function(client) {
        var clients = self.clients;
        for(i=0;i<clients.length;++i) {
            if(clients[i] == client) {
                clients.removeAt(i);
                break;
            }
        }
    };


    self.listen = function(port) {
		server.listen(port);
		io = io.listen(server);


		self.on = function(event, callback) {
			switch(event) {
			case 'connection':
				io.on('connection', function(ioclient) {
					if(ioclient.connection) {
						ioclient.connection.setNoDelay(true);
					}

					var client = new Client(self, io, ioclient);
                    self.addClient(client);

					ioclient.client = client;
					setNetworkCallbacks(client);
					callback(client);
				});
				break;
			}
		};
	};


	self.basePath = __dirname;
}

module.exports = Server;
