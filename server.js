var app = require('express')();
var server = require('http').createServer(app).listen(3000);
var bodyParser = require('body-parser');

var Order = require('./src/order');
var Menu = require('./src/menu');
var CalculateTotal = require('./src/calculateTotal');
var Receipt = require('./src/receipt');
var	SendReceipt = require('./src/sendReceipt'); 

var menu = new Menu('hipstercoffee.json');
var order = new Order();
var calculateTotal = new CalculateTotal();
var receipt = new Receipt();
var sendReceipt = new SendReceipt();
var hasSentReceipt;

var uuid = require('node-uuid');

app.use(bodyParser.urlencoded({ extended: true }));

function menuItems(callback) { 
	menu.allItems(function(items) {
		callback(items)
	});
};

function resetOrder() { 
	order = new Order();
	hasSentReceipt = false;
};

function sendReceiptHelper(email, receiptName, callback) { 
	sendReceipt.to(email);
	sendReceipt.from('jmitchinson@gmail.com');
	sendReceipt.subject('Your Receipt');
	sendReceipt.receipt(receiptName);
	sendReceipt.message('Thanks for stopping by at the Coffee Connection. Here\'s your receipt.');
	sendReceipt.send(function(err, hasSent) {
		callback(err, hasSent);
	});
}

app.set('view engine', 'ejs');

app.get('/', function(req, res){
	menuItems(function(items) { 
		res.render('index', { allItems: items, currentOrder: order, total: calculateTotal, sent: hasSentReceipt });
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

app.post('/send_receipt', function(req, res) { 
	var receiptNumber = uuid.v1();
	receipt.create(receiptNumber, order.items());
	setTimeout(function() {
 		sendReceiptHelper(req.body.email, receiptNumber, function(err, hasSent) { 
 			hasSentReceipt = true;
 			res.redirect('/');
		});
	}, 1500);
});

app.post('/payment', function(req, res) { 
	console.log(req.body.payment);
	
	res.redirect('/');
});

module.exports = app;