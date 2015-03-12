var chai 				= require('chai');
var expect 		 	= chai.expect;
var Menu		 		= require('../src/menu');

describe('Menu', function() {
	var menu;

	beforeEach(function() {
		menu = new Menu('hipstercoffee.json');
	});

	it('should be able to check if an item exists', function(done) { 
		menu.hasExistence('Cafe Latte', function(item) { 
			expect(item).to.equal(true);
			done();
		});
	});

	it('should be able to check if an item doesn\'t exist', function(done) { 
		menu.hasExistence('BIG BURGER', function(item) { 
			expect(item).to.equal(false);
			done();
		});
	});

	it('should be able to look up an items price', function(done) {
		menu.getPrice('Cafe Latte', function(price) { 
			expect(price).to.equal(4.75);
			done();
		})
	});

});