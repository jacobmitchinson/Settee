var chai 				= require('chai');
var expect 		 	= chai.expect;
var Menu		 		= require('../src/menu');

describe('Menu', function() {
	var menu;

	beforeEach(function() {
		menu = new Menu('hipstercoffee.json');
	});

	it('should be able to look up an items price', function(done) {
		menu.getPrice('Cafe Latte', function(price) { 
			expect(price).to.equal(4.75);
			done();
		})
	});

});