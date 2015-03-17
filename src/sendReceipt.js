var sendgrid 		= require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
var newEmail    = new sendgrid.Email();

var SendReceipt = function() { 
	DEFAULT_FILE_LOCATION = './receipts';
	DEFAULT_SUBJECT = 'Your receipt.';
	DEFAULT_MESSAGE = 'Thanks for stopping by!';
	this.emailTo = null;
	this.emailFrom = null;
	this.emailSubject = DEFAULT_SUBJECT;
	this.fileDirectory = DEFAULT_FILE_LOCATION;
	this.emailFile = null;
	this.emailMessage = DEFAULT_MESSAGE;
};


SendReceipt.prototype.send = function(callback) {
	this._prepareEmail();
	sendgrid.send(newEmail, function(err, json) {
		callback(err, json);
	});
};

SendReceipt.prototype._prepareEmail = function() {
	newEmail.addTo(this.emailTo);
	newEmail.setFrom(this.emailFrom);
	newEmail.setSubject(this.emailSubject);
	newEmail.setText(this.emailMessage);
	newEmail.addFile({
		path: this.emailFile
	});
};

SendReceipt.prototype.to = function(email) { 
	this.emailTo = email;
};

SendReceipt.prototype.from = function(email) { 
	this.emailFrom = email;
};

SendReceipt.prototype.subject = function(subject) { 
	this.emailSubject = subject;
};

SendReceipt.prototype.receipt = function(fileName) {
	this.emailFile = this.fileDirectory + '/' + fileName + '.pdf';
};

SendReceipt.prototype.setFileDirectory = function(directory) {
	this.fileDirectory = directory;
};

SendReceipt.prototype.message = function(message) {
	this.emailMessage = message;
};

module.exports = SendReceipt;