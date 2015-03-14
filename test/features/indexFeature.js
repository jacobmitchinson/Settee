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

  it('should let a user input an order', function(done){
  	client.url('file:///Users/jacobmitchinson/Desktop/MA/Projects/till_tech_test/test.pdf')
  		.getText()
  });
});
