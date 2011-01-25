/// <reference path="Common.js" />

function Vector(_x, _y)
{
	if (_y === undefined)
	{
		this.x = this.y = _x || 0;
	}
	else
	{
		this.x = _x;
		this.y = _y;
	}

	this.clone = function ()
	{
		return new Vector(this.x, this.y);
	};

	this.add = function (x, y)
	{
		if (y === undefined)
		{
			this.x += x.x;
			this.y += x.y;
		}
		else
		{
			this.x += x;
			this.y += y;
		}
	};

	this.sub = function (x, y)
	{
		if (y === undefined)
		{
			this.x -= x.x;
			this.y -= x.y;
		}
		else
		{
			this.x -= x;
			this.y -= y;
		}
	};

	this.mul = function (a)
	{
		this.x *= a;
		this.y *= a;
	};

	this.div = function (a)
	{
		this.x /= a;
		this.y /= a;
	};

	this.length = function ()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	this.lengthSquared = function ()
	{
		return this.x * this.x + this.y * this.y;
	};

	this.normalize = function ()
	{
		var len = this.length();

		if (len != 0)
		{
			this.x /= len;
			this.y /= len;
		}
	};

	this.clamp = function (minX, maxX, minY, maxY)
	{
		this.x = Math.clamp(minX, maxX, this.x);
		this.y = Math.clamp(minY, maxY, this.y);
	};

	this.equals = function (other)
	{
		return this.x == other.x && this.y == other.y;
	};

	this.toString = function ()
	{
		return this.x + " : " + this.y;
	};
}

module.exports = Vector;