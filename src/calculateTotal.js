var Menu = require('./menu');
var menu = new Menu('hipstercoffee.json'); 

var CalculateTotal = function() { 
  this.taxRate = 0.0864;
};

CalculateTotal.prototype.total = function(items) { 
  var prices = this._returnPrices(items);
  var length = prices.length;
  var total = 0;
  for(var i = 0; i < length; i++) { 
    total += prices[i];
  }
  return total;
};

CalculateTotal.prototype.totalWithTax = function(items) { 
  var total = this.total(items);
  var taxRate = this.taxRate;
  var tax = total * taxRate;
  var total = total + tax;
  return +(total).toFixed(2);
};

CalculateTotal.prototype.totalTax = function(items) {
  var total = this.total(items);
  var taxRate = this.taxRate;
  var tax = total * taxRate;
  return +(tax).toFixed(2);
};

CalculateTotal.prototype._returnPrices = function(items) { 
  var length = items.length;
  var prices = [];
  for (var i = 0; i < length; i++) {
    prices.push(items[i][1]); 
  }
  return prices;
};

module.exports = CalculateTotal;