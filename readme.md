#RebalanceJS
RebalanceJS is a small module that analyzes your current stock portfolio and advises you on the trades to make in order to rebalance according to your specified asset allocation.

##Installation
Clone this repo and run `npm install`.
To run tests: `npm test`.

##Setup
Open `portfolio.js` and add your portfolio to the `portfolio` array.

Each stock you add should be an object with the following properties:

* ticker: `string` - The stocks ticker symbol.
* target: `number` - Percentage of your portfolio (ex: 0.25 = 25%, 0.75 = 75%, 1 = 100%).
* owned: `number` - The number of shares you currently own.
* price: `number` - The current price of the stock. This will be ignored of the `getLiveQuotes` option is set to true.

If you would like to provide the price for each stock, set the `getLiveQuotes` option to false. If set to true, the module will poll Markit On Demand for the latest prices and ignore the price set in `portfolio.js`.

##Usage
Run `node rebalance.js`

##Reasoning
Having been using Node and Angular in my current job, I decided to implement this solution in Javascript. My experience with Node is limited, so I decided to also have the script fetch live results in order to gain a better grasp on how to deal with it's asynchronous nature.

##Notes
While this module meets the basic requirements, it's not perfect. For example, with the given portfolio we end up with $30 that would not be reinvested - that's enough for 1 additional AAPL share and 1 additional TSLA share. The next feature I would build would determine the optimal investment of any leftover funds once we've met our allocation for each stock.

In order to accomplish this I would likely start by refactoring the getAdvice() function, which is already borderline doing too much.

I would also continue writing further tests in order to flesh out potential edge cases and improve error handling, as well as take a look at how I could better structure the module to allow for future improvements.