/// <reference path="../Common.js" />

function CanvasRenderer(canvas)
{
	var fieldImage = new Image();
	fieldImage.src = '/images/boisko.png';

	var playerImage = new Image();
	playerImage.src = '/images/gracz.png';

	var myImage = new Image();
	myImage.src = '/images/me.png';

	var ballImage = new Image();
	ballImage.src = '/images/pilka.png';

	var context = canvas.getContext('2d');

	this.drawField = function (width, height)
	{
		if (fieldImage.complete)
			context.drawImage(fieldImage, 0, 0, width, height);
	};

	this.drawPlayer = function (position, me)
	{
		if (myImage.complete && playerImage.complete)
			context.drawImage(me ? myImage : playerImage, position.x - 16, position.y - 16, 32, 32);
        var name = "dupa";
        var metrics = context.measureText(name);

        context.textBaseline = "top";
        context.font = "12px solid helvetica";
        context.fillStyle = "black";
        context.fillText(name, position.x - metrics.width/2 + 1, position.y + 16 + 1);
        context.fillStyle = "white";
        context.fillText(name, position.x - metrics.width/2, position.y + 16);
	};

	this.drawBall = function (position)
	{
		if (ballImage.complete)
			context.drawImage(ballImage, position.x - 12, position.y - 12, 24, 24);
	};
}