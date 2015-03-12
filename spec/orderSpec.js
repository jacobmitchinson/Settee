var Order 	= require('../src/order');
var chai 		= require('chai');
var expect 	= chai.expect;

describe('Order', function() {

	var order;

	beforeEach(function() { 
		order = new Order();
	});

	function addItems(order, callback) { 
		order.addToItems('Cafe Latte', function() {});
		order.addToItems('Flat White', function() { 
			callback(order);
		});
	};

	it('should be able to add items to an order', function(done) { 
		order.addToItems('Cafe Latte', function(totalOrder) { 
			expect(totalOrder).to.contain({"Cafe Latte": 4.75});
			done();
		});
	});

	it('should be able to retrieve items from an order', function() { 
		expect(order.items()).to.contain({});
	});
});