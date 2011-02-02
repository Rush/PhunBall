/// <reference path="../jQuery/jquery.js"/>
/// <reference path="../jQuery/jquery.json.js"/>

// Namespace declarations

var Acx =
{
	Tests: {}
};

// Missing functions

function escapeHTML(text)
{
	var chars = { "<": "&lt;", ">": "&gt;", "&": "&amp;", "\"": "&quot;" };

	return text.replace(/[<>&"]/g, function (c)
	{
		return chars[c];
	});
}

Date.parseJSON = function (jsonDate)
{
	/// <summary>Parses date string produced by .NET JSON serializer.</summary>
	/// <param name="jsonDate" type="String">Date string.</param>
	/// <returns type="Date" />

	return new Date(parseInt(jsonDate.replace(/\D/g, '')));
};

if (!Math.clamp)
{
	Math.clamp = function (min, max, value)
	{
		/// <summary>Clamps value to range specified by min and max.</summary>
		/// <param name="min" type="Number">Minimal value.</param>
		/// <param name="max" type="Number">Maximal value.</param>
		/// <param name="value" type="Number">Value to clamp.</param>
		/// <returns type="Number" />

		return min > value ? min : max < value ? max : value;
	};
}

if (!Math.lerp)
{
	Math.lerp = function (from, to, position)
	{
		/// <summary></summary>
		/// <param name="from" type="Number"></param>
		/// <param name="to" type="Number"></param>
		/// <param name="position" type="Number"></param>
		/// <returns type="Number" />

		return from * (1 - position) + to * position;
	};
}

if (!String.prototype.trim)
{
	String.prototype.trim = function ()
	{
		/// <summary>Removes whitespace charaters from beginnig and end of string.</summary>
		/// <returns type="String" />

		return this.replace(/(^\s+|\s+$)/g, '');
	};
}

if (!String.prototype.toUpperCaseFirst)
{
	String.prototype.toUpperCaseFirst = function ()
	{
		/// <summary>Changes first character in string to upper case.</summary>
		/// <returns type="String" />

		return this.replace(/^([a-z])/, function (x) { return x.toUpperCase(); });
	};
}

if (!Array.prototype.reduce)
{
	Array.prototype.reduce = function (c)
	{
		var a = this.length >>> 0; if (typeof c != "function") throw new TypeError; if (a == 0 && arguments.length == 1) throw new TypeError; var b = 0; if (arguments.length >= 2) var d = arguments[1]; else { do { if (b in this) { d = this[b++]; break } if (++b >= a) throw new TypeError; } while (1) } for (; b < a; b++) if (b in this) d = c.call(null, d, this[b], b, this); return d
	};
}

if (!Array.prototype.reduceRight)
{
	Array.prototype.reduceRight = function (c)
	{
		var a = this.length >>> 0; if (typeof c != "function") throw new TypeError; if (a == 0 && arguments.length == 1) throw new TypeError; a = a - 1; if (arguments.length >= 2) var b = arguments[1]; else { do { if (a in this) { b = this[a--]; break } if (--a < 0) throw new TypeError; } while (1) } for (; a >= 0; a--) if (a in this) b = c.call(null, b, this[a], a, this); return b
	};
}
