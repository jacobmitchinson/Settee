var fs = require("fs");

var Menu = function(file) {
	this.file = file;
};

// TODO: menu should just be responsible for returning item with price

Menu.prototype.getPrice = function(item, callback) { 	
	this._readJSON(function(menuJSON) {
		var itemPrice = menuJSON.prices[0][item];
		callback(itemPrice); // TODO: callbacks should have an error
	});
};

Menu.prototype.hasExistence = function(item, callback) {
	this._readJSON(function(menuJSON) { 
		if(menuJSON.prices[0][item]) { 
			callback(true);
		} else { 
			callback(false);
		}
	});
};
 
Menu.prototype._readJSON = function(callback) {
	fs.readFile(this.file, 'utf8', function(err,data) { 
		if(err) throw err; // TODO: I don't want to throw an error here. That will crash system.
		var json = JSON.parse(data);
		callback(err, json); // TODO: callbacks should have an error.
	});
};

module.exports = Menu;