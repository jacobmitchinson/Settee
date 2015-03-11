var Menu = require('./menu');
var menu = new Menu('hipstercoffee.json');

var Order = function() { 
	this.totalOrder = {};
};

Order.prototype.addToItems = function(item, callback) { 
	var items = this.totalOrder;
	var self = this;
	menu.getPrice(item, function(price) {
		items[item] = price;
		callback(self.totalOrder);
	});
};

Order.prototype.items = function() {
	return this.totalOrder;
};

module.exports = Order;
