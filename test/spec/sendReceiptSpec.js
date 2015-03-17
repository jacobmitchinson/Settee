var expect = require('chai').expect;
var SendReceipt = require('../../src/sendReceipt');

describe('SendReceipt', function() { 

	var sendReceipt;

	beforeEach(function() { 
		sendReceipt = new SendReceipt();
	});

	it('should enable a user to select an email to send to', function() { 
		sendReceipt.to('jmitchinson@gmail.com');
		expect(sendReceipt.emailTo).to.eql('jmitchinson@gmail.com');
	});

	it('should enable a user to select where the email came from', function() { 
		sendReceipt.from('jmitchinson@gmail.com');
		expect(sendReceipt.emailFrom).to.eql('jmitchinson@gmail.com');
	});

	it('should enable a user to set the subject', function() { 
		sendReceipt.subject('Your Receipt');
		expect(sendReceipt.emailSubject).to.eql('Your Receipt');
	});

	it('should enable a user to set the file directory', function() { 
		sendReceipt.setFileDirectory('./this');
		expect(sendReceipt.fileDirectory).to.eql('./this');
	});

	it('should enable a user to select the desired receipt', function() { 
		sendReceipt.receipt('12345');
		expect(sendReceipt.emailFile).to.eql('./receipts/12345.pdf');
	});

	it('should enable a user to enter the message to be sent', function() { 
		sendReceipt.message('Thanks for stopping by at the Coffee Connection. Here\'s your receipt.');
		expect(sendReceipt.emailMessage).to.contain('Thanks for stopping by at the Coffee Connection. Here\'s your receipt.');
	});

	it('should send an email', function(done) { 
		sendReceipt.to('jmitchinson@gmail.com');
		sendReceipt.from('jmitchinson@gmail.com');
		sendReceipt.subject('Your Receipt');
		sendReceipt.receipt('test');
		sendReceipt.message('Thanks for stopping by at the Coffee Connection. Here\'s your receipt.');
		sendReceipt.send(function(err, hasSent) {
			expect(hasSent).to.eql({message: 'success'});
			done();
		});
	});

});