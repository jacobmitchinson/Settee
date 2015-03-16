var Menu = require('./menu');
var menu = new Menu('hipstercoffee.json');

var Order = function() { 
	this.allItems = [];
};

Order.prototype.addToItems = function(item, callback) { 
	var items = this.items();
	var _this = this;
	menu.hasItem(item, function(itemExists) { // TODO: MAKE THIS SHORTER!!! 
		if(itemExists) { 
			menu.getPrice(item, function(price) { 
				items.push([item, price]);
				callback(true);
			});
		} else { 
			callback(false);
		}
	});
};

Order.prototype.items = function() {
	return this.allItems;
};	

module.exports = Order;
