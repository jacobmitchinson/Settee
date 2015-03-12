var CalculateTotal 	= require('../src/calculateTotal');
var Order 					= require('../src/order');
var chai 						= require('chai');
var expect 					= chai.expect;

describe('Order', function() {

	var order;

	beforeEach(function() { 
		order = new Order(); // TODO: use spies.
		calculateTotal  = new CalculateTotal();
	});

	function addItems(order, callback) { 
		order.addToItems('Cafe Latte', function() {});
		order.addToItems('Flat White', function() { 
			callback(order);
		});
	};

	it('should be able to total the order', function(done) {
		var totalWithTax = 9.50;
		addItems(order, function(orderWithItems) { 
			expect(orderWithItems.total()).to.equal(totalWithTax);
			done();
		});
	});

	it('should be able to add tax to the order', function(done) { 
		var totalWithTax = 10.32;
		addItems(order, function(orderWithItems) { 
			expect(orderWithItems.totalWithTax()).to.equal(totalWithTax);
			done();
		});
	});
});