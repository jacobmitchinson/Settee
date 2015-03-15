var CalculateTotal 	= require('../../src/calculateTotal');
var Order 					= require('../../src/order');
var chai 						= require('chai');
var expect 					= chai.expect;

describe('CalculateTotal', function() {

	var order;
	var calculateTotal;

	beforeEach(function() { 
		order = new Order(); // TODO: use spies.
		calculateTotal  = new CalculateTotal();
	});

	function addItems(order, callback) { 
		order.addToItems('Cafe Latte', function() {
			order.addToItems('Flat White', function() { 
				callback(order);
			});
		});
	};

	it('should be able to total the order', function(done) {
		var total = 9.50;
		addItems(order, function() { 
			expect(calculateTotal.total(order.items())).to.equal(total);
			done();
		});
	});

	it('should be able to return the tax', function(done) { 
		var tax = 0.82;
		addItems(order, function() { 
			expect(calculateTotal.totalTax(order.items())).to.equal(tax);
			done();
		});
	});

	it('should be able to add tax to the order', function(done) { 
		var totalWithTax = 10.32;
		addItems(order, function() { 
			expect(calculateTotal.totalWithTax(order.items())).to.equal(totalWithTax);
			done();
		});
	});
});