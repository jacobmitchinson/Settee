var fs = require("fs");

var Menu = function(file) {
	this.file = file;
};

Menu.prototype.getPrice = function(item, callback) { 	
	this._readJSON(function(menuJSON) {
		var itemPrice = menuJSON.prices[0][item];
		callback(itemPrice);
	});
};
 
Menu.prototype._readJSON = function(callback) {
	fs.readFile(this.file, 'utf8', function(err,data) { 
		if(err) throw err; 
		var json = JSON.parse(data);
		callback(json);
	});
};

module.exports = Menu;