var TakePayment = function(total) { 

}

TakePayment.prototype.calculateChange = function(money, total) {
	return money - total;
}; 

module.exports = TakePayment;