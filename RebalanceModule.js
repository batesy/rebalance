'use strict';

var RebalancePortfolio = {
  advice: [],

  init: function(portfolio) {
    this.rebalancePortfolio(portfolio);
  },

  rebalancePortfolio: function(portfolio) {
    var portfolioValue = this.getPortfolioValue(portfolio);
    var that = this;
    portfolio.forEach(function(stock) {
      that.getAdvice(stock, portfolioValue);
    });
    this.displayAdvice();
  },

  getPortfolioValue: function(portfolio) {
    var sum = 0;
    if (portfolio.length) {
      portfolio.map(function(stock) { sum += (stock.owned * stock.price) });
      return sum;
    } else {
      throw new Error("You must provide a portfolio");
    }
  },

  getAdvice: function(stock, portfolioValue) {
    var action;
    var targetShares = (portfolioValue * stock.target) / stock.price;
    var change = Math.floor(Math.abs(stock.owned - targetShares));
    stock.owned > targetShares ? action = 'Sell ' : action = 'Buy ';
    if (change > 0) {
      var stockAdvice = action + change + ' shares of ' + stock.ticker;
      this.advice.push(stockAdvice);
    }
  },

  displayAdvice: function() {
    if (this.advice.length) {
      this.advice.forEach(function(advice) {
        console.log(advice);
      });
    } else {
      console.log("Portfolio is balanced.");
    }
  }
};

exports.RebalanceModule = RebalancePortfolio;