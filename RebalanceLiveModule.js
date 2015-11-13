'use strict';
var request = require('request');
var portfolio = require('./portfolio').Portfolio;


var RebalancePortfolioLive = {
  advice: [],

  init: function() {
    var that = this;
    this.getStockPrices(portfolio, function() {
      that.rebalancePortfolio(portfolio);
    });
  },

  getStockPrices: function(portfolio, callback) {
    if (portfolio.length) {
      var count = 0;
      portfolio.forEach(function(stock) {
        request('http://dev.markitondemand.com/MODApis/Api/v2/Quote/json?symbol=' + stock.ticker, function(error, response, body) {
          if (!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            stock.price = data.LastPrice;
            count++;
            if (count === portfolio.length)
              callback();
          }
        });
      });
    }
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
    portfolio.map(function(stock) { sum += (stock.owned * stock.price) });
    return sum;
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

exports.RebalanceLive = RebalancePortfolioLive;