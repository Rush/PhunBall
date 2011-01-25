/// <reference path="../Common.js" />

function KeyboardInput()
{
	var move = new Vector();
	var left, up, rigth, down;

	left = up = right = down = false;

	$(document).bind("keydown keyup", function (event)
	{
		if (event.keyCode >= Key.Left && event.keyCode <= Key.Down)
		{
			var value = event.type == 'keydown';

			if (event.keyCode == Key.Left)
				left = value;
			else if (event.keyCode == Key.Up)
				up = value;
			else if (event.keyCode == Key.Right)
				right = value;
			else if (event.keyCode == Key.Down)
				down = value;

			move.x = right ^ left ? (right ? 1 : -1) : 0;
			move.y = down ^ up ? (down ? 1 : -1) : 0;

			return false;
		}
	});

	this.getMovement = function ()
	{
		return move;
	};
}