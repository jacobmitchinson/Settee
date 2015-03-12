var Menu = require('./menu');
var menu = new Menu('hipstercoffee.json');

var Order = function() { 
	this.json = '{}';
	this.allItemsJSON = JSON.parse(this.json);
};

Order.prototype.addToItems = function(item, callback) { 
	var items = this.items();
	var _this = this;
	menu.hasItem(item, function(itemExists) { // TODO: MAKE THIS SHORTER!!! 
		if(itemExists) { 
			menu.getPrice(item, function(price) {
				items[item] = price;
				callback(_this.items());
			});
		} else { 
			callback('This item doesn\'t exist!');
		}
	});
};

Order.prototype.items = function() {
	return this.allItemsJSON;
};	

module.exports = Order;
