var Menu = require('./menu');
var menu = new Menu('hipstercoffee.json');

var Order = function() { 
	this.json = '{}';
	this.allItemsJSON = JSON.parse(this.json);
};

// TODO: this is unecessary we just need to take the key value for each item

Order.prototype.addToItems = function(item, callback) { 
	var items = this.items();
	var _this = this;
	menu.hasItem(item, function(itemExists) { 
		if(itemExists) { 
			menu.getPrice(item, function(price) {
				items[item] = price;
				callback(_this.items());
			});
		};
	});
};

Order.prototype.items = function() {
	return this.allItemsJSON;
};	

// TODO: these probably belong in their own class

Order.prototype.total = function() { 
  var prices = this._returnPrices(this.items());
  var length = prices.length;
  var total = 0;
  for(var i = 0; i < length; i++) { 
  	total += prices[i];
  }
  return total;
};

// TODO: Remove magic numbers

Order.prototype.totalWithTax = function() { 
	var total = this.total();
	var taxRate = 0.0864;
	var tax = total * taxRate;
	total = total + tax;
	return +(total).toFixed(2);
};

Order.prototype._returnPrices = function(object) { 
	var keys = Object.keys(object);
  var length = keys.length;
  var values = Array(length);
  for (var i = 0; i < length; i++) {
    values[i] = object[keys[i]];
  }
  return values;
};

module.exports = Order;
