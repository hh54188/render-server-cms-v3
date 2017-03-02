var _fnArr = [];

setInterval(function () {
	_fnArr.forEach(function (fn) {
		fn();
	});
}, 1000 * 1)

module.exports = {
	add: function (fn) {
		_fnArr.push(fn);
		console.log('loop length--->', _fnArr.length);
	}
}