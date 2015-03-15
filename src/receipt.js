var PDFDocument     = require('pdfkit');
var fs              = require('fs');
var CalculateTotal  = require('./calculateTotal');

var Receipt = function() { 
	this.doc = new PDFDocument({size: 'executive'});
};

Receipt.prototype.create = function(fileName, order) {
  this.doc.pipe(fs.createWriteStream(fileName + '.pdf'));
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
  };
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