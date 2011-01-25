/// <reference path="Common.js" />
/// <reference path="Vector.js" />

var playerImage = new Image();
playerImage.src = '/images/gracz.png';

var myImage = new Image();
myImage.src = '/images/me.png';

function Player(id, name, pos)
{
	this.id = id;
	this.name = name;
	this.position = pos;
	this.velocity = new Vector();
	this.image = name == "Rav" ? myImage : playerImage;

	this.draw = function (context)
	{
		context.drawImage(this.image, this.position.x - 16, this.position.y - 16, 32, 32);
	};
}