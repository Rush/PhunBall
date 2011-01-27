/// <reference path="../Common.js" />
/// <reference path="../Vector.js" />
/// <reference path="Ball.js" />
/// <reference path="Player.js" />

function Field(width, height)
{
	var self = this;

	this.width = width;
	this.height = height;
	this.players = [];
	this.player = new Player(0, "Rav", new Vector(0, 0));
	this.ball = new Ball(new Vector(width / 2, height / 2));

    var id2player = [];

    this.getPlayerById = function(id) {
        return id2player[id];
    };

    this.addPlayer = function(player) {
        this.players.add(player);
        id2player[player.id] = player;
    };
    this.removePlayer = function(player) {
        this.players.remove(player);
        id2player[player.id] = undefined;
    };
}

module.exports = Field;