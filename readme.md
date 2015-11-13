#RebalanceJS

RebalanceJS is a small module that analyzes your current stock portfolio and advises you on the trades to make in order to rebalance according to your specified asset allocation.

##Installation
Clone this repo and run `npm install`.
To run tests: `npm test`

##Setup
Open `portfolio.js` and add your portfolio to the `portfolio` array.

Each stock you add should be an object with the following properties:

* ticker: `string` - The stocks ticker symbol.
* target: `number` - ex: 0.25 = 25%, 0.75 = 75%. 1 = 100%.
* owned: `number` - The number of shares you currently own.
* price: `number` - The current price of the stock. This will be ignored of the `getLiveQuotes` option is set to true.

If you would like to provide the price for each stock, set the `getLiveQuotes` option to false. If set to true, the module will poll Markit On Demand for the latest prices.

##Usage
Run `node rebalance.js`