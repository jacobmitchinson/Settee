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
  var taxRate = 0.0864;
  var tax = total * this.taxRate;
  total = total + tax;
  return +(total).toFixed(2);
};

CalculateTotal.prototype._returnPrices = function(object) { 
  var keys = Object.keys(object);
  var length = keys.length;
  var values = Array(length);
  for (var i = 0; i < length; i++) {
    values[i] = object[keys[i]];
  }
  return values;
};


module.exports = CalculateTotal;