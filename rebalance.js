'use strict';
var rb = require('./RebalanceModule').RebalanceModule;


var portfolio = require('./portfolio').Portfolio;

var options = {
  getLiveQuotes: true
}

rebalance(portfolio, options);

function rebalance(portfolio, options) {
  rb.init(portfolio, options);
}