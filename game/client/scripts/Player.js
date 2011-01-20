/// <reference path="Vector.js" />

function Player(id, name, pos)
{
	var playerImage = new Image();
	playerImage.src = name == "Rav" ? '/images/me.png' : '/images/gracz.png';

	this.id = id;
	this.name = name;
	this.position = pos;

	this.draw = function (context)
	{
		context.drawImage(playerImage, this.position.x - 16, this.position.y - 16, 32, 32);
	};
}
