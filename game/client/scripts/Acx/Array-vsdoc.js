// Documentation for array methods

Array.prototype.push = function (element1, elementN)
{
	/// <summary>Mutates an array by appending the given elements and returning the new length of the array.</summary>
	/// <param name="element1" type="Object">Element to add.</param>
	/// <returns type="Number" integer="true" />
};

Array.prototype.pop = function ()
{
	/// <summary>Removes the last element from an array and returns that element.</summary>
	/// <returns type="Object" />
};

Array.prototype.reverse = function ()
{
	/// <summary>Reverses an array in place. The first array element becomes the last and the last becomes the first.</summary>	
};

Array.prototype.shift = function ()
{
	/// <summary>Removes the first element from an array and returns that element. This method changes the length of the array.</summary>
	/// <returns type="Object" />
};

Array.prototype.sort = function (compareFunction)
{
	/// <summary>Sorts the elements of an array in place.</summary>
	/// <param name="compareFunction" type="Function" optional="true">Function to use for comparison: function (a, b) should return &lt; 0 if a &lt; b.</param>
};

Array.prototype.splice = function (index, howMany, element1, elementN)
{
	/// <summary>Changes the content of an array, adding new elements while removing old elements. Returns removed elements.</summary>
	/// <param name="index" type="Number" integer="true">Index at which to start changing the array. If negative, will begin that many elements from the end.</param>
	/// <param name="howMany" type="Number" integer="true">An integer indicating the number of old array elements to remove.</param>
	/// <param name="element1" type="Object" optional="true">The elements to add to the array. If you don't specify any elements, splice simply removes elements from the array.</param>
	/// <returns type="Array" />
};

Array.prototype.unshift = function (element1, elementN)
{
	/// <summary>Adds one or more elements to the beginning of an array and returns the new length of the array.</summary>
	/// <param name="element1" type="Object">Element fo add to the front of the array.</param>
	/// <returns type="Number" integer="true" />	
};

Array.prototype.indexOf = function (element, start)
{
	/// <summary>Determines index of first occurence of element in array or -1 if element is not found</summary>
	/// <param name="element" type="Object">Element fo search for in array.</param>
	/// <param name="start" type="Number" integer="true" optional="true">Index to start searching from.</param>
	/// <returns type="Number" integer="true" />
};

Array.prototype.lastIndexOf = function (element, start)
{
	/// <summary>Determines index of last occurence of element in array or -1 if element is not found</summary>
	/// <param name="element" type="Object">Element fo search for in array.</param>
	/// <param name="start" type="Number" integer="true" optional="true">Offset from end to start searching from.</param>
	/// <returns type="Number" integer="true" />
};

Array.prototype.forEach = function (callback, thisPointer)
{
	/// <summary>Iterates over array and calls callback function for each element in array.</summary>
	/// <param name="callback" type="Function">Function to call for each element: function (element, index, array).</param>
	/// <param name="thisPointer" type="Object" optional="true">Object to set as this in callcack function.</param>
};

Array.prototype.filter = function (predicate, thisPointer)
{
	/// <summary>Filters out elements that do not conform to predicate function.</summary>
	/// <param name="predicate" type="Function">Function to use as predicate for filtering: function (element, index, array).</param>
	/// <param name="thisPointer" type="Object" optional="true">Object to set as this in predicate function.</param>
	/// <returns type="Array" />
};

Array.prototype.every = function (predicate, thisPointer)
{
	/// <summary>Checks if all elements in array conforms to given predicate function.</summary>
	/// <param name="predicate" type="Function">Function to use as predicate for checking: function (element, index, array).</param>
	/// <param name="thisPointer" type="Object" optional="true">Object to set as this in predicate function.</param>
	/// <returns type="Boolean" />
};

Array.prototype.some = function (predicate, thisPointer)
{
	/// <summary>Checks if any of elements in array conforms to given predicate function.</summary>
	/// <param name="predicate" type="Function">Function to use as predicate for checking: function (element, index, array).</param>
	/// <param name="thisPointer" type="Object" optional="true">Object to set as this in predicate function.</param>
	/// <returns type="Boolean" />
};

Array.prototype.map = function (selector, thisPointer)
{
	/// <summary>Projects each element of a sequence into new form.</summary>
	/// <param name="selector" type="Function">Function to use as selector for filtering: function (element, index, array).</param>
	/// <param name="thisPointer" type="Object" optional="true">Object to set as this in predicate function.</param>
	/// <returns type="Array" />
};

Array.prototype.reduce = function (callback, initial)
{
	/// <summary>Reducdes array to one element.</summary>
	/// <param name="callback" type="Function">Function to call for each aggregation: function(accumulator, currentValue, index, array).</param>
	/// <param name="initial" type="Object">Initial value of accumulator.</param>
	/// <returns type="Object" />
};

Array.prototype.reduceRight = function (callback, initial)
{
	/// <summary>Reducdes array to one element.</summary>
	/// <param name="callback" type="Function">Function to call for each aggregation: function(accumulator, currentValue, index, array).</param>
	/// <param name="initial" type="Object">Initial value of accumulator.</param>
	/// <returns type="Object" />
};

Array.prototype.concat = function (vlue1, valueN)
{
	/// <summary>Returns a new array comprised of this array joined with other array(s) and/or value(s).</summary>
	/// <param name="value1" type="Object">Arrays and/or values to concatenate to the resulting array.</param>
	/// <returns type="Array" />
};

Array.prototype.join = function (separator)
{
	/// <summary>Joins all elements of an array into a string.</summary>
	/// <param name="name" type="String" optional="true">Specifies a string to separate each element of the array. The separator is converted to a string if necessary. If omitted, the array elements are separated with a comma.</param>
	/// <returns type="String" />
};

Array.prototype.slice = function (begin, end)
{
	/// <summary>Returns a one-level deep copy of a portion of an array.</summary>
	/// <param name="begin" type="Number" integer="true">
	/// 	Zero-based index at which to begin extraction. 
	/// 	As a negative index, start indicates an offset from the end of the 
	/// 	sequence. slice(-2) extracts the second-to-last element and the last 
	/// 	element in the sequence.
	/// </param>
	/// <param name="end" type="Number" integer="true">
	/// 	Zero-based index at which to end extraction. 
	/// 	slice extracts up to but not including end. 
    /// 	slice(1,4) extracts the second element through the fourth element (elements indexed 1, 2, and 3). 
    /// 	As a negative index, end indicates an offset from the end of the sequence. slice(2,-1) extracts the third element through the second-to-last element in the sequence. 
    /// 	If end is omitted, slice extracts to the end of the sequence. 
	/// </param>
	/// <returns type="Array" />
};

Array.prototype.enqueue = Array.prototype.push;
Array.prototype.dequeue = Array.prototype.shift;
Array.prototype.prepend = Array.prototype.unshift;
Array.prototype.select = Array.prototype.map;
Array.prototype.where = Array.prototype.filter;
Array.prototype.all = Array.prototype.every;
Array.prototype.any = Array.prototype.some;

Array.prototype.add = function (element)
{
	/// <summary>Adds element to end of array.</summary>
	/// <param name="element" type="Object">Element to add.</param>
};

Array.prototype.foreach = function (callback)
{
	/// <summary>Iterates over array.</summary>
	///	<param name="callback" type="Function">
	///		Function to invoke foreach element in array.
	///		First parameter is element, second parameter is index.
	/// </param>
};

Array.prototype.removeAt = function (index)
{
	/// <summary>Removes element from array at given position.</summary>
	/// <param name="index" type="Number" integer="true">Index of element to remove.</param>
};

Array.prototype.remove = function (item)
{
	/// <summary>Removes element from array.</summary>
	///	<param name="item" type="Object">Element in array.</param>
};

Array.prototype.first = function ()
{
	/// <summary>Returns first element in a sequence.</summary>
	/// <returns type="Object" />
};

Array.prototype.last = function ()
{
	/// <summary>Returns last element in a sequence.</summary>
	/// <returns type="Object" />
};

Array.prototype.contains = function (item)
{
	/// <summary>Determines whether sequence contains specified element.</summary>
	///	<param name="item" type="Object">Element to check.</param>
	/// <returns type="Boolean" />
};

Array.prototype.sum = function (selector, initial)
{
	/// <summary>Sums all elements in a sequence.</summary>
	///	<param name="selector" type="Function" optional="true">
	///		Function to invoke foreach element in array.
	///		First parameter is element, second parameter is index.
	///		Function should return agreggable value.
	/// </param>
	/// <param name="initial" type="Object">Initial value of accumulator.</param>
	/// <returns type="Object" />
};

Array.prototype.min = function (selector)
{
	/// <summary>Returns minimum value in a sequence.</summary>
	///	<param name="selector" type="Function" optional="true">
	///		Function to invoke foreach element in array.
	///		First parameter is element, second parameter is index.
	///		Function should return agreggable value.
	/// </param>
	/// <returns type="Number" />
};

Array.prototype.max = function (selector)
{
	/// <summary>Returns maximum value in a sequence.</summary>
	///	<param name="selector" type="Function" optional="true">
	///		Function to invoke foreach element in array.
	///		First parameter is element, second parameter is index.
	///		Function should return agreggable value.
	/// </param>
	/// <returns type="Number" />
};

Array.prototype.selectMany = function (selector)
{
	/// <summary>Projects each element of a sequence into a sequence and flattens result.</summary>
	///	<param name="selector" type="Function" optional="true">
	///		Function to invoke foreach element in array.
	///		First parameter is element, second parameter is index.
	/// </param>
	/// <returns type="Array" />
};

Array.prototype.single = function (predicate)
{
	/// <summary>
	/// 	Selects one element from collection and throws exception if there are 
	/// 	no elements or more than one element.
	/// </summary>
	/// <param name="predicate" type="Function" optional="true">Optional predicate.</param>
	/// <returns type="Object" />
};

Array.prototype.singleOrDefault = function (predicate, defaultValue)
{
	/// <summary>
	/// 	Selects one element from collection, throws exception if there are 
	/// 	more than one element and returns defaultValue if there are no elements.
	/// </summary>
	/// <param name="predicate" type="Function" optional="true">Optional value selector.</param>
	/// <param name="defaultValue" type="Object" optional="true">Default value to return on no elements</param>
	/// <returns type="Object" />
};

Array.prototype.toDictionary = function (keySelector)
{
	/// <summary>Converts list to keyed collection.</summary>
	/// <param name="keySelector" type="Function">Key selector function.</param>
	/// <returns type="Array" />
};

Array.prototype.skip = function (count)
{
	/// <summary>Skips specified number of items.</summary>
	/// <param name="count" type="Number">Number of items to skip.</param>
	/// <returns type="Array" />
};

Array.prototype.take = function (count)
{
	/// <summary>Takes specified number of items from list.</summary>
	/// <param name="count" type="Number">Number of items to take.</param>
	/// <returns type="Array" />
};

Array.range = function (start, count)
{
	/// <summary>Generates sequence of integral numbers within specified range.</summary>
	///	<param name="start" type="Number" integer="true">Value of first integer in a sequence.</param>
	///	<param name="count" type="Number" integer="true">Number of integers in a sequence.</param>
	/// <returns type="Array" elementType="Number" elementInteger="true" />
};

Array.repeat = function (item, count)
{
	/// <summary>Generates sequence of repeated items.</summary>
	///	<param name="item" type="Object">Value to repeat in a sequence.</param>
	///	<param name="count" type="Number" integer="true">Number of repetitions in a sequence.</param>
	/// <returns type="Array" />
};
