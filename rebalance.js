'use strict';
var rb = require('./RebalanceModule').RebalanceModule;
var rbLive = require('./RebalanceLiveModule').RebalanceLive;

var portfolio = require('./portfolio').Portfolio;

var options = {
  getLiveQuotes: false
}

rebalance(portfolio, options);

function rebalance(portfolio, options) {
  options.getLiveQuotes ? rbLive.init(portfolio) : rb.init(portfolio);
}