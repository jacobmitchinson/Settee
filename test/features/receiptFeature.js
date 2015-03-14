var expect 					= require('chai').expect; 
var PDFtotextjs  		= require('pdftotextjs');
var expect					= require('chai').expect;
var fs 							= require('fs');
var Receipt 				= require('../../src/receipt');

describe('Receipt', function() { 

	var pdf; 
	var data;

	beforeEach(function() { 
		var receipt = new Receipt();
		receipt.create('test');
	});

	afterEach(function() {
		var filePath = "test.pdf";
		fs.unlinkSync(filePath);
	});

	function readPDF() { 
		pdf = new PDFtotextjs('test.pdf');
		data = pdf.getTextSync();
	}

	it('testing setup', function(done) { 
		this.timeout(2000);
		setTimeout(function() {
 			readPDF();
 			expect(data).to.contain('hey there');
 			done();
		}, 1500);
	});

});