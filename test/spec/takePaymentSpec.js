var expect 					= require('chai').expect;
var CalculateTotal 	= require('../../src/calculateTotal');
var Order 					= require('../../src/order');
var TakePayment			= require('../../src/takePayment');

describe('Payment', function() { 

	var order;
	var calculateTotal;
	var payment;

	beforeEach(function() { 
		order = new Order();
		calculateTotal  = new CalculateTotal();
		payment = new TakePayment();
	});

	function addItems(order, callback) { 
		order.addToItems('Cafe Latte', function() {
			order.addToItems('Flat White', function() { 
				callback(order);
			});
		});
	};

	it('should be able to take the correct total and calculate change', function(done) { 
		addItems(order, function(order) { 
			var total = calculateTotal.total(order.items());
			expect(payment.calculateChange(10, total)).to.eql(0.5);
			done();
		});
	});

});