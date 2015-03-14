var expect 					= require('chai').expect; 
var PDFtotextjs  		= require('pdftotextjs');
var expect					= require('chai').expect;
var fs 							= require('fs');
var Receipt 				= require('../../src/receipt');
var Order 					= require('../../src/order');

describe('Receipt', function() { 

	var pdf; 
	var data;

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
		var order = new Order();
		order.addToItems('Cafe Latte', function() { 
			order.addToItems('Choc Mudcake', function() { 
				createReceipt(order.items());	
			});
		});
	};

	it('should be able to display ordered items with a price', function(done) { 
		createOrder();
		this.timeout(2000);
		setTimeout(function() {
 			readPDF();
 			expect(data).to.contain('Cafe Latte: 4.75');
 			done();
		}, 1500);
	});

});