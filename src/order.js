var Menu = require('./menu');
var menu = new Menu('hipstercoffee.json');

var Order = function() { 
	this.json = '{}';
	this.allItemsJSON = JSON.parse(this.json);
};

// this is unecessary we just need to take the key value for each item

Order.prototype.addToItems = function(item, callback) { 
	var items = this.items();
	var self = this;
	menu.getPrice(item, function(price) {
		items[item] = price;
		callback(self.items());
	});
};

Order.prototype.items = function() {
	return this.allItemsJSON;
};	

// these probably belong in their own class

Order.prototype.total = function() { 
  var prices = this._returnPrices(this.items());
  var length = prices.length;
  var total = 0;
  for(var i = 0; i < length; i++) { 
  	total += prices[i];
  }
  return total;
};

Order.prototype.totalWithTax = function() { 
	var total = this.total();
	var tax = total * 0.0864;
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
