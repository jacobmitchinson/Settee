var expect 			= require('chai').expect;
var webdriverio = require('webdriverio');

describe('Homepage', function() { 

	var client = {};

  before(function(done) {
    client = webdriverio.remote({ desiredCapabilities: { browserName: 'chrome'}});
    client.init(done);
  });

  after(function(done) {
    client.end(done);
  });

  it('should enable the user to reset the order', function(done) { 
  	client
  		.url('http://localhost:3000')
  		.click('#reset')
  		.getText('#current-orders', function(err, text) { 
  			expect(text).not.to.contain('Cafe Latte: £4.75')
  		})
  		.call(done);
  });

	it('should enable the user to enter the order', function(done) { 
		client
			.url('http://localhost:3000')
			.getValue('#select',function(err,val){
      	console.log(val); 
    	})
			.click('//*[@id="item-dropdown"]/option[1]')
			.click('#submit')
			.getText('#current-orders', function(err, text) { 
				expect(text).to.contain('Cafe Latte: £4.75')
			})
			.call(done);
	});


});
