var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , io = require('../node-bin')
  , sys = require(process.binding('natives').util ? 'util' : 'sys')
  , server;


function send404(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

function sendFile(path) {
	fs.readFile(__dirname + path,
				function(err, data) {
					if (err)
						return send404(res);
					res.writeHead(200, {'Content-Type': path.substring(path.length-3,path.length) == '.js' ? 'text/javascript' : 'text/html'});
					res.write(data, 'utf8');
					res.end();
				});	
}

server = http.createServer(function(req, res){
		// your normal server code
		var path = url.parse(req.url).pathname;
		switch (path){
		case '/':
/*      res.writeHead(200, {'Content-Type': 'text/html'});
		res.write('<h1>Welcome. Try the <a href="/demo.html">demo</a> example.</h1>');
		res.end();
		break;*/
			sendFile('/game.html');			
		case '/json.js':
		case '/socket.io.js':
			sendFile("/lib/" + path);
		break;
		case '/game.html':
			sendFile(path);
			break;
			
		default:
			send404(res);
		}
	});


server.listen(8081);

var io = io.listen(server);


var tick = 0;


function worldUpdate() {


	
	tick++;
}


setInterval(worldUpdate, 1);

io.on('connection', function(client){
		
		function updateStuff() {
			
			client.updateInterval = setTimeout(updateStuff, 20);
		}
		client.updateInterval = setTimeout(updateStuff, 20);
		
		client.on('disconnect', function(){
				clearTimeout(client.updateInterval);
			});
	});
