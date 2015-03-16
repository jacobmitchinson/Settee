var app = require('express')();
var server = require('http').createServer(app).listen(3000);
var bodyParser = require('body-parser');

var Order = require('./src/order');
var Menu = require('./src/menu');
var CalculateTotal = require('./src/calculateTotal');

var menu = new Menu('hipstercoffee.json');
var calculateTotal = new CalculateTotal();
var order = new Order();

app.use(bodyParser.urlencoded({ extended: true }));

function menuItems(callback) { 
	menu.allItems(function(items) {
		callback(items)
	});
};

function resetOrder() { 
	order = new Order();
};

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	menuItems(function(items) { 
		res.render('index', { allItems: items, currentOrder: order, total: calculateTotal });
	});
});

app.post('/order_item', function(req, res) { 
	order.addToItems(req.body.item, function() { 
		res.redirect('/');
	});
});

app.post('/reset_order', function(req, res) { 
	resetOrder();
	res.redirect('/');
});

module.exports = app;