var expect 					= require('chai').expect; 
var PDFtotextjs  		= require('pdftotextjs');
var expect					= require('chai').expect;
var fs 							= require('fs');
var Receipt 				= require('../../src/receipt');
var Order 					= require('../../src/order');

describe('Receipt', function() { 

	var pdf; 
	var data;
	var order;

	afterEach(function() {
		var filePath = "test.pdf";
		fs.unlinkSync(filePath);
	});

	function readPDF() { 
		pdf = new PDFtotextjs('test.pdf');
		data = pdf.getTextSync();
	}

	function createReceipt(order) { 
		var receipt = new Receipt();
		receipt.create('test', order);
	}

	function createOrder() { 
		order = new Order();
		order.addToItems('Cafe Latte', function() { 
			order.addToItems('Choc Mudcake', function() { 
				createReceipt(order.items());	
			});
		});
	};

	it('should display the name of the coffee shop', function(done) { 
		createOrder();
		this.timeout(2500);
		setTimeout(function() {
 			readPDF();
 			expect(data).to.contain('The Coffee Connection');
 			done();
		}, 1500);
	});


	it('should display the address of the coffee shop', function(done) { 
		createOrder();
		this.timeout(2500);
		setTimeout(function() {
 			readPDF();
 			expect(data).to.contain('123 Lakeside Way. Phone: +1 (650) 360-0708');
 			done();
		}, 1500);
	});


	it('should be able to display ordered items with a price', function(done) { 
		createOrder();
		this.timeout(2500);
		setTimeout(function() {
 			readPDF();
 			expect(data).to.contain('Choc Mudcake: �6.40');
 			done();
		}, 1500);
	});

	it('should be able to calculate the total cost', function(done) { 
		createOrder();
		this.timeout(2500);
		setTimeout(function() { 
			readPDF();
			expect(data).to.contain('Cost: �11.15');
			done();
		}, 1500);
	});

	it('should be able to show the tax', function(done) { 
		createOrder();
		this.timeout(2500);
		setTimeout(function() { 
			readPDF();
			expect(data).to.contain('Tax: �0.96');
			done();
		}, 1500);
	});

	it('should be able to add the tax to the total on the receipt', function(done) { 
		createOrder();
		this.timeout(2500);
		setTimeout(function() { 
			readPDF();
			expect(data).to.contain('Total: �12.11');
			done();
		}, 1500);
	});

});