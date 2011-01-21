/// <reference path="Common.js" />

function Vector(x, y)
{
	if (y === undefined)
	{
		this.x = this.y = x || 0;
	}
	else
	{
		this.x = x;
		this.y = y;
	}

	this.add = function (vec)
	{
		return new Vector(this.x + vec.x, this.y + vec.y);
	}

	this.sub = function (vec)
	{
		return new Vector(this.x - vec.x, this.y - vec.y);
	}

	this.mul = function (a)
	{
		return new Vector(this.x * a, this.y * a);
	}

	this.div = function (a)
	{
		return new Vector(this.x / a, this.y / a);
	}

	this.length = function ()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}

	this.lengthSquared = function ()
	{
		return this.x * this.x + this.y * this.y;
	}

	this.normalize = function ()
	{
		var len = this.length();

		if (len != 0)
			return new Vector(this.x / len, this.y / len);
		else
			return new Vector();
	}

	this.toString = function ()
	{
		return this.x + " : " + this.y;
	}
}

module.exports = Vector;