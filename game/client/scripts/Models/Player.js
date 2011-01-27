/// <reference path="Common.js" />
/// <reference path="Vector.js" />

function Player(id, name, pos)
{
	this.id = id;
	this.name = name;
	this.position = pos;
	this.velocity = new Vector();
}

module.exports = Player;