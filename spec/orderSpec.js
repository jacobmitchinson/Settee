var Order 	= require('../src/order');
var chai 		= require('chai');
var expect 	= chai.expect;

describe('Order', function() {
	it('should be able to place an order', function(done) { 
		var order = new Order();
		order.addToItems('Cafe Latte', function(totalOrder) { 
			expect(totalOrder).to.contain({"Cafe Latte": 4.75});
			done();
		});
	});
});