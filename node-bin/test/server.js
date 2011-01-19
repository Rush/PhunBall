/**
 * Important note: this application is not suitable for benchmarks!
 */

var http = require('http')
  , url = require('url')
  , fs = require('fs')
  , io = require('../')
  , sys = require(process.binding('natives').util ? 'util' : 'sys')
  , server;

server = http.createServer(function(req, res){
  // your normal server code
  var path = url.parse(req.url).pathname;
  switch (path){
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Welcome. Try the <a href="/demo.html">demo</a> example.</h1>');
      res.end();
      break;
      
    case '/json.js':
    case '/demo.html':
      fs.readFile(__dirname + path, function(err, data){
        if (err) return send404(res);
        res.writeHead(200, {'Content-Type': path == 'json.js' ? 'text/javascript' : 'text/html'})
        res.write(data, 'utf8');
        res.end();
      });
      break;
      
    default: send404(res);
  }
}),

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
};

server.listen(8081);

var io = io.listen(server);

var balls = [];
for(i=0; i < 100; ++i) {
	var ball = {x : 50 + Math.random() * 500, y : 50 + Math.random() * 500, r : 5 + Math.random() * 20, dx: Math.random()*0.2 - 0.1, dy: Math.random()*0.2 - 0.1};
	balls.push(ball);
}


var tick = 0;

	setInterval(function() {

		for(var i in balls) {

		var x = balls[i].x;
		var y = balls[i].y;
		if( x<0 || x>600) balls[i].dx=-balls[i].dx;
		if( y<0 || y>600) balls[i].dy=-balls[i].dy;
		x+=balls[i].dx;
		y+=balls[i].dy;
		balls[i].x = x;
		balls[i].y = y;

		}
		tick++;
	}, 1);

	io.on('connection', function(client){

	function updateStuff() {
		var sendBalls = [];
		for(var i in balls) {
			sendBalls.push({x : balls[i].x|0, y : balls[i].y|0, r: balls[i].r|0});
		}
		client.send({balls: sendBalls} );
		console.log("sending update to " + client.sessionId + " ---> tick " + tick);
		client.updateInterval = setTimeout(updateStuff, 20);
	}
	client.updateInterval = setTimeout(updateStuff, 20);

  client.on('disconnect', function(){
		clearTimeout(client.updateInterval);
  });
});
