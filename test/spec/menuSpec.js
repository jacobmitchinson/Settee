var chai 				= require('chai');
var expect 		 	= chai.expect;
var Menu		 		= require('../../src/menu');
var menuJSON		= require('../../hipstercoffee.json');

describe('Menu', function() {
	var menu;

	beforeEach(function() {
		menu = new Menu('hipstercoffee.json');
	});

	it('should be able to check if an item exists', function(done) { 
		menu.hasItem('Cafe Latte', function(item) { 
			expect(item).to.equal(true);
			done();
		});
	});

	it('should be able to check if an item doesn\'t exist', function(done) { 
		menu.hasItem('BIG BURGER', function(item) { 
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

	it('should be able to show all items available', function(done) { 
		var allItems = Object.keys(menuJSON.prices[0]);
		menu.allItems(function(items) { 
			expect(items).to.eql(allItems);
			done();
		})
	});

});