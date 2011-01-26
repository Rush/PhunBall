/// <reference path="../Common.js" />
/// <reference path="../Vector.js" />
/// <reference path="Ball.js" />
/// <reference path="Player.js" />

function Field(width, height)
{
	this.width = width;
	this.height = height;
	this.players = [];
	this.player = new Player(0, "Rav", new Vector(0, 0));
	this.ball = new Ball(new Vector(width / 2, height / 2));
}

module.exports = Field;