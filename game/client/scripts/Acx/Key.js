/// <reference path="../jQuery/jquery.js" />

var Key = (function ()
{
	var ie = /(MSIE|Chrome|Safari)/.test(navigator.userAgent);
	var op = /Opera/.test(navigator.userAgent);

	var keys =
	{
		Backspace: 8,
		Tab: 9,
		NumpadCenter: 12,
		Enter: 13,
		Shift: 16,
		Ctrl: 17,
		Alt: 18,
		Pause: 19,
		CapsLock: 20,
		Escape: 27,
		Space: 32,
		PageUp: 33,
		PageDown: 34,
		End: 35,
		Home: 36,
		Left: 37,
		Up: 38,
		Right: 39,
		Down: 40,
		Insert: 45,                // not working in Opera
		Delete: 46,
		Semicolon: (ie ? 186 : 59), // ; :
		WindowsLeft: 91,           // 224 / 17 on apple ?
		WindowsRight: 92,          // 224 / 17 on apple ?
		ContextMenu: 93,
		Multiply: 106,             // *
		Add: (ie ? 187 : (op ? 61 : 107)), // + = (107 is numeric on IE)
		Subtract: (ie ? 189 : 109), // - _ (109 is numeric on IE)
		NumpadAdd: (op ? 43 : 107), // +
		NumpadSubtract: 109,
		DecimalPoint: 110,         // numeric, culture-specific
		Divide: 111,               // /
		NumLock: 144,
		ScrollLock: 145,
		Comma: 188,                // , <
		Period: 190,               // . >
		ForwardSlash: 191,         // / ?
		GraveAccent: 192,          // ` ~
		OpenBracket: 219,          // [ {
		BackSlash: 220,            // \ |
		CloseBracket: 221,         // ] }
		SingleQuote: 222           // ' "
	};

	var chars =
	{
		Tab: '\t',
		Enter: '\r\n',
		Space: ' ',
		Semicolon: [';', ':'],
		Multiply: '*',
		Add: ['+', '='],
		Subtract: ['-', '_'],
		NumpadAdd: '+',
		NumpadSubtract: '-',
		DecimalPoint: '.',         // should be culture specific
		Divide: '/',
		Comma: [',', '<'],
		Period: ['.', '>'],
		ForwardSlash: ['/', '?'],
		GraveAccent: ['`', '~'],
		OpenBracket: ['[', '{'],
		BackSlash: ['\\', '|'],
		CloseBracket: [']', '}'],
		SingleQuote: ['\'', '"']
	};

	var symbols = [')', '!', '@', '#', '$', '%', '^', '&', '*', '('];
	var i;

	// Numbers
	for (i = 0; i <= 9; i++)
	{
		keys['Number' + i] = i + 48;
		keys['Numeric' + i] = i + 96;

		chars['Number' + i] = [i.toString(), symbols[i]];
		chars['Numeric' + i] = i.toString();
	}

	// Alpha
	for (i = 65; i <= 90; i++)
	{
		var c = String.fromCharCode(i);

		keys[c] = i;
		chars[c] = [c.toLowerCase(), c];
	}

	// F keys
	for (i = 1; i <= 12; i++)
		keys['F' + i] = i + 111;

	keys.ToName = function (key)
	{
		/// <summary>Converts keyCode value to key name.</summary>
		/// <param name="key" type="Number" integer="true">KeyCode to convert.</param>
		/// <returns type="String" />

		for (var j in keys)
		{
			if (key == keys[j])
				return j;
		}

		return key.toString();
	};

	keys.ToChar = function (key, shift)
	{
		/// <summary>Converts keyCode value to character.</summary>
		/// <param name="key" type="Number" integer="true">KeyCode to convert.</param>
		/// <returns type="String" />

		var name = keys.ToName(key);
		var ch = chars[name];

		if (ch === undefined)
			return '';

		if (ch.constructor == Array)
			return ch[shift ? 1 : 0];
		else
			return ch;
	};

	keys.IsAlpha = function (key)
	{
		/// <summary>Checks if keycode corresponds to character button.</summary>
		/// <param name="key" type="Number" integer="true">KeyCode to check.</param>
		/// <returns type="Boolean" />

		return key >= keys.A && key <= keys.Z
	};

	keys.IsNumber = function (key)
	{
		/// <summary>Checks if keycode corresponds to number button.</summary>
		/// <param name="key" type="Number" integer="true">KeyCode to check.</param>
		/// <returns type="Boolean" />

		return (key >= keys.Number0 && key <= keys.Number9) ||
		       (key >= keys.Numeric0 && key <= keys.Numeric9);
	};

	// TODO: name to key, char to key + shift

	return keys;
})();