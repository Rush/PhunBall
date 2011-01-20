/// <reference path="Vector.js" />

function Ball(pos)
{
	var ballImage = new Image();
	ballImage.src = '/images/pilka.png';

	this.position = pos;

	this.draw = function (context)
	{
		context.drawImage(ballImage, this.position.x - 12, this.position.y - 12, 24, 24);
	};
}
