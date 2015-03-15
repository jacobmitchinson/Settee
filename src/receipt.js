var PDFDocument     = require('pdfkit');
var fs              = require('fs');
var CalculateTotal  = require('./calculateTotal');

var Receipt = function() { 
	this.doc = new PDFDocument();
};

Receipt.prototype.create = function(name, order) {
  this.doc.pipe(fs.createWriteStream(name + '.pdf'));
  this._addAllItems(order);
  this._addTotal(order);
  this._addTotalWithTax(order);
  this.doc.end();
};

Receipt.prototype._addText = function(text) {
	this.doc.text(text);
};

Receipt.prototype._addAllItems = function(order) {  
	var itemsWithPrice = this._itemsWithPrice(order);
  var length = itemsWithPrice.length;
  for(var i = 0; i < length; i++) { 
  	this._addText(itemsWithPrice[i][0]);
  };
};

Receipt.prototype._addTotal = function(order) {
  var calculateTotal = new CalculateTotal();
  var total = calculateTotal.total(order);
  var totalText = 'Cost: ' + '£' + total; 
  this._addText(totalText);
};

Receipt.prototype._addTotalWithTax = function(order) {
  var calculateTotal = new CalculateTotal();
  var totalWithTax = calculateTotal.totalWithTax(order);
  var totalWithTaxText = 'Total: ' + '£' + totalWithTax;
  this._addText(totalWithTaxText);
};

// TODO: not sure this belongs here

Receipt.prototype._itemsWithPrice = function(order) { 
	var items = Object.keys(order);
	var length = items.length;
	var pairs = Array(length);
	for (var i = 0; i < length; i++) {
	  pairs[i] = [items[i] + ': ' + '£' + (order[items[i]]).toFixed(2)];
	}
	return pairs;
};

module.exports = Receipt;