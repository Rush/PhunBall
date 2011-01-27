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

    this.addPlayer = function(newPlayer) {
        this.players.push(newPlayer);
        return newPlayer;
    };
    this.delPlayer = function(somePlayer) {
        var players = this.players;
        for(i = 0;i < players.length;++i) {
            if(players[i] == somePlayer) {
                this.players.removeAt(i);
                return true;
            }
        }
        return false;
    };

}

module.exports = Field;