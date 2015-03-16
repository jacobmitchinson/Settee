var expect 			= require('chai').expect;
var webdriverio = require('webdriverio');

describe('Homepage', function() { 

	var client = {};

  beforeEach(function(done) {
    client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome'}});
    client.init(done);
  });

  afterEach(function(done) {
    client.end(done);
  });

  function enterOrder() {
  	client
			.url('http://localhost:3000')
			.click('//*[@id="item-dropdown"]/option[1]')
			.click('#submit')
			.url('http://localhost:3000')
			.click('//*[@id="item-dropdown"]/option[2]')
			.click('#submit')
		return client;
  };

	it('should enable the user to enter the order', function(done) { 
		enterOrder()
			.getText('#current-items', function(err, text) { 
				expect(text).to.contain('Cafe Latte: £4.75')
			})
			.call(done);
	});

  it('should enable the user to reset the order', function(done) { 
  	client
  		.url('http://localhost:3000')
  		.click('#reset')
  		.url('http://localhost:3000')
  		.getText('#current-orders', function(err, text) { 
  			expect(text).not.to.contain('Cafe Latte: £4.75')
  		})
  		.call(done);
  });

  it('should be able to display the total for the order', function(done) { 
  	enterOrder()
  		.getText('#display-total', function(err, text) { 
  			expect(text).to.contain('Total: £9.50')
  		})
  		.call(done);
  });


});
