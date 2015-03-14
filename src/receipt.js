var PDFDocument = require('pdfkit');
var fs = require('fs');

var Receipt = function() { 
	this.doc = new PDFDocument();
};

Receipt.prototype.create = function(name, order) {
  this.doc.pipe(fs.createWriteStream(name + '.pdf'));
  this._addAllItems(order);
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

// TODO: not sure this belongs here

Receipt.prototype._itemsWithPrice = function(order) { 
	var items = Object.keys(order);
	var length = items.length;
	var pairs = Array(length);
	for (var i = 0; i < length; i++) {
	  pairs[i] = [items[i] + ': ' + order[items[i]]];
	}
	return pairs;
};

module.exports = Receipt;