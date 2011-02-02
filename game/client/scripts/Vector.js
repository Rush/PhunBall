/// <reference path="Common.js" />

function Vector(x, y)
{
	if (y === undefined)
	{
		if (x && x.x)
		{
			this.x = x.x;
			this.y = x.y;
		}
		else
		{
			this.x = this.y = x || 0;
		}
	}
	else
	{
		this.x = x;
		this.y = y;
	}
}

Vector.prototype =
{
	clone: function ()
	{
		return new Vector(this.x, this.y);
	},

	set: function (x, y)
	{
		if (y === undefined)
		{
			this.x = x.x;
			this.y = x.y;
		}
		else
		{
			this.x = x;
			this.y = y;
		}
	},

	add: function (x, y)
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
	},

	sub: function (x, y)
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
	},

	mul: function (a)
	{
		this.x *= a;
		this.y *= a;
	},

	div: function (a)
	{
		this.x /= a;
		this.y /= a;
	},

	length: function ()
	{
		return Math.sqrt(this.x * this.x + this.y * this.y);
	},

	lengthSquared: function ()
	{
		return this.x * this.x + this.y * this.y;
	},

	normalize: function ()
	{
		var len = this.length();

		if (len != 0)
		{
			this.x /= len;
			this.y /= len;
		}
	},

	clamp: function (minX, maxX, minY, maxY)
	{
		this.x = Math.clamp(minX, maxX, this.x);
		this.y = Math.clamp(minY, maxY, this.y);
	},

	equals: function (other)
	{
		return this.x == other.x && this.y == other.y;
	},

	empty: function ()
	{
		return this.x == 0 && this.y == 0;
	},

	toString: function ()
	{
		return this.x + " : " + this.y;
	},

	toStruct: function ()
	{
		return { x: this.x, y: this.y };
	}
};

module.exports = Vector;