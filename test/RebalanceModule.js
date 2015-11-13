var assert = require('assert');
var rb = require('../RebalanceModule');
var portfolio = require('../portfolio').Portfolio;

console.log(portfolio);

describe('RebalanceModule', function() {
  describe('#getPortfolioValue()', function(){
    it('should return an integer', function() {
      assert.equal(Number.isInteger(rb.RebalanceModule.getPortfolioValue(portfolio)), true);
    });
    it('should return 10000', function() {
      assert.equal(rb.RebalanceModule.getPortfolioValue(portfolio), 10000);
    });
    it('should return 607200', function() {
      var portfolio = [{price: 423, owned: 32}, {price: 3, owned: 3221}, {price: 3123, owned: 187}];
      assert.equal(rb.RebalanceModule.getPortfolioValue(portfolio), 607200);
    });
    it('should throw an error if no portfolio is provided', function() {
      var portfolio = {};
      assert.throws(function() {
        rb.RebalanceModule.getPortfolioValue(portfolio)
      }, Error, "Error thrown")
    });
  });

  describe('#getAdvice()', function() {
    it('should push advice to array', function() {
      var stock = {ticker: 'GOOG', price: 421, owned: 93, target: 0.15};
      var portfolioValue = 235100;
      var adviceLength = rb.RebalanceModule.advice.length;
      rb.RebalanceModule.getAdvice(stock, portfolioValue);
      assert.equal(rb.RebalanceModule.advice.length, adviceLength + 1);
    });
    it('advice pushed to array should be a string', function() {
      var stock = {ticker: 'GOOG', price: 421, owned: 93, target: 0.15};
      var portfolioValue = 235100;
      var advice = rb.RebalanceModule.advice;
      rb.RebalanceModule.getAdvice(stock, portfolioValue);
      assert.equal(typeof advice[advice.length - 1], 'string')
    });
    it('should advise to buy 23 shares of goog', function() {
      var stock = {ticker: 'GOOG', price: 421, owned: 60, target: 0.15};
      var portfolioValue = 235100;
      var adviceLength = rb.RebalanceModule.advice.length;
      var advice = rb.RebalanceModule.advice;
      rb.RebalanceModule.getAdvice(stock, portfolioValue);
      assert.equal(advice[advice.length - 1], 'Buy 23 shares of GOOG');
    });
  })
});