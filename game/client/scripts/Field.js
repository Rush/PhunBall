/// <reference path="Vector.js" />
/// <reference path="Ball.js" />
/// <reference path="Player.js" />

function Field(width, height)
{
	var fieldImage = new Image();
	fieldImage.src = '/images/boisko.png';

	this.players = [];
	this.player = new Player(0, "Rav", new Vector(0, 0));
	this.ball = new Ball(new Vector(width / 2, height / 2));

	this.update = function (time)
	{
	};

	this.draw = function (context)
	{
		context.drawImage(fieldImage, 0, 0, width, height);

		this.player.draw(context);
		this.players.forEach(function (p) { p.draw(context); });
		this.ball.draw(context);
	};

	this.addPlayer = function (id, x, y)
	{
		this.players.add(new Player(id, "name", new Vector(x, y)));
	};

	this.id2index = function id2index(id) {
		for (var i = 0; i < this.players.length; i++)
		{
			if (this.players[i].id == id)
			{
				return i;
				break;
			}
		}
		return -1;
	}


	this.removePlayer = function (id)
	{
		this.players.removeAt(this.id2index(id));
	};


	this.setPlayerPosition = function (id, pos)
	{
		var player = this.players[this.id2index(id)];
		pos.x = Math.clamp(0, width, pos.x);
		pos.y = Math.clamp(0, height, pos.y);
		player.position = pos;
	};


	this.movePlayer = function (v)
	{
		var p = this.player.position.add(v);
		p.x = Math.clamp(0, width, p.x);
		p.y = Math.clamp(0, height, p.y);
		this.player.position = p;
	};
}
