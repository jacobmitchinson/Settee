var PDFDocument     = require('pdfkit');
var fs              = require('fs');
var CalculateTotal  = require('./calculateTotal');

var Receipt = function(location) { 
	this.doc = new PDFDocument({size: 'executive'});
};

// TODO: DRY this out

Receipt.prototype.create = function(fileName, order) {
  this.doc.pipe(fs.createWriteStream('./receipts/' + fileName + '.pdf'));
  this._addImage();
  this._addName();
  this._addAddress();
  this._addAllItems(order);
  this._addTotal(order);
  this._addTax(order);
  this._addTotalWithTax(order);
  this.doc.end();
};

Receipt.prototype._addImage = function() { 
  this.doc.image('receipt/shopLogo.png', {
    width: 200,
    align: 'center'
  });
};

Receipt.prototype._addText = function(text) {
	this.doc.text(text);
};

// TODO: observe the open/closed principle

Receipt.prototype._addName = function() { 
  var name = 'The Coffee Connection';
  this.doc.text(name);
};

Receipt.prototype._addAddress = function() {
  var address = '123 Lakeside Way. Phone: +1 (650) 360-0708';
  this.doc.text(address);
};

Receipt.prototype._addAllItems = function(order) { 
	var itemsWithPrice = this._itemsWithPrice(order);
  var length = itemsWithPrice.length;
  for(var i = 0; i < length; i++) { 
  	this._addText(itemsWithPrice[i][0]);
  }
};

Receipt.prototype._addTotal = function(order) {
  var calculateTotal = new CalculateTotal();
  var total = calculateTotal.total(order);
  var totalText = 'Cost: ' + '£' + total; 
  this._addText(totalText);
};

Receipt.prototype._addTax = function(order) {
  var calculateTotal = new CalculateTotal();
  var tax = calculateTotal.totalTax(order);
  var taxText = 'Tax: ' + '£' + tax; 
  this._addText(taxText);
};

Receipt.prototype._addTotalWithTax = function(order) {
  var calculateTotal = new CalculateTotal();
  var totalWithTax = calculateTotal.totalWithTax(order);
  var totalWithTaxText = 'Total: ' + '£' + totalWithTax;
  this._addText(totalWithTaxText);
};

Receipt.prototype._itemsWithPrice = function(items) { 
	var length = items.length;
	var pairs = new Array(length);
	for (var i = 0; i < length; i++) {
	  pairs[i] = [items[i][0] + ': ' + '£' + (items[i][1]).toFixed(2)];
	}
	return pairs;
};

module.exports = Receipt;