// Additional array helper methods

Array.prototype.enqueue = Array.prototype.push;
Array.prototype.dequeue = Array.prototype.shift;
Array.prototype.prepend = Array.prototype.unshift;
Array.prototype.all = Array.prototype.every;
Array.prototype.any = Array.prototype.some;

Array.prototype.add = function (element)
{
	this[this.length] = element;
};

Array.prototype.removeAt = function (index)
{
	if (index != -1)
		this.splice(index, 1);
};

Array.prototype.remove = function (item)
{
	this.removeAt(this.indexOf(item));
};

Array.prototype.insert = function (index, item)
{
	this.splice(index, 0, item);
};

Array.prototype.first = function ()
{
	if (this.length == 0)
		throw new Error('Collection does not contain any elements.');

	return this[0];
};

Array.prototype.last = function ()
{
	if (this.length == 0)
		throw new Error('Collection does not contain any elements.');

	return this[this.length - 1];
};

Array.prototype.contains = function (item)
{
	return this.indexOf(item) != -1;
};

Array.prototype.sum = function (selector, initial)
{
	var list = selector ? this.select(selector) : this;
	return list.reduce(function (sum, v, i) { return sum + v; }, initial || 0);
};

Array.prototype.min = function (selector)
{
	if (this.length == 0)
		throw new Error('Collection does not contain any elements.');

	return Math.min.apply(null, selector ? this.select(selector) : this);
};

Array.prototype.max = function (selector)
{
	if (this.length == 0)
		throw new Error('Collection does not contain any elements.');

	return Math.max.apply(null, selector ? this.select(selector) : this);
};

Array.prototype.selectMany = function (selector)
{
	return [].concat.apply([], selector ? this.select(selector) : this);
};

Array.prototype.single = function (predicate)
{
	var list = predicate ? this.where(predicate) : this;

	if (list.length === 0)
		throw new Error('Collection does not contain any elements.');

	if (list.length > 1)
		throw new Error('Collection contains more than one element.');

	return list.first();
};

Array.prototype.singleOrDefault = function (predicate, defaultValue)
{
	if (defaultValue === undefined)
		defaultValue = null;

	var list = predicate ? this.where(predicate) : this;

	if (list.length === 0)
		return defaultValue;

	if (list.length > 1)
		throw new Error('Collection contains more than one element.');

	return list.first();
};

Array.prototype.toDictionary = function (keySelector, valueSelector)
{
	valueSelector = valueSelector ? valueSelector : function (x) { return x; };

	var temp = [];

	this.forEach(function (element, index)
	{
		temp[keySelector(element, index)] = valueSelector(element, index);
	});

	return temp;
};

Array.prototype.skip = function (count)
{
	return this.slice(count);
};

Array.prototype.take = function (count)
{
	return this.slice(0, count);
};

Array.prototype.distinct = function (comparer)
{
	var result = [];

	comparer = comparer ? comparer : function (a, b) { return a == b; };

	this.forEach(function (i)
	{
		if (!result.any(function (x)
		{
			return comparer(x, i);
		}))
		{
			result.add(i);
		}
	});

	return result;
};

Array.range = function (start, count)
{
	var t = [];

	for (var i = 0; i < count; ++i)
		t[i] = i + start;

	return t;
};

Array.repeat = function (item, count)
{
	var t = [];

	for (var i = 0; i < count; ++i)
		t[i] = item;

	return t;
};
