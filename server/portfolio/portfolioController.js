// handles functions for dashboard display, stock purchases, and stock sales from the portfolio db

var Portfolio = require('./PortfolioModel.js');
var Q = require('q');

module.exports = {
  display: function(req, res, next){
    var username = req.body.username;
    
    var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);
    findPortfolio({username: username})
      .then(function(portfolio){
        console.log(portfolio);
        next(portfolio.stocks, portfolio.cash_balance); // callback with stocks and cash balance info
      })
      .fail(function(error){
        console.log(error);
      });
  },

  buy: function(req, res, next){
    // buy: give me user info and stock info and this will insert it in stocks property
    var username = req.body.username;
    var stockPurchase = {
      screen_name: req.body, // pass in stock purchase data (replace req.body later)
      name: req.body, 
      follower_count_at_purchase: req.body,
      price_at_purchase: req.body,
      date_of_purchase: req.body,
      shares: req.body
    };

    var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);
    findPortfolio({username: username})
      .then(function(portfolio){
        console.log(portfolio);
        portfolio.stocks.push(stockPurchase);
        // To do: add logic for additional purchases vs new purchases
      })
      .fail(function(error){
        console.log(error);
      });
  },
  sell: function(req, res, next){
    var username = req.body.username;
    var stockSale = {
      screen_name: req.body, // pass in stock purchase screen name (replace req.body later)
      name: req.body, 
      follower_count_at_sale: req.body, // need to find follower count at sale
      price_at_sale: req.body, // need to find price at sale at sale
      date_of_sale: req.body, // need date of sale
      shares: req.body
    };

    var findPortfolio = Q.nbind(Portfolio.findOne, Portfolio);
    findPortfolio({username: username})
      .then(function(portfolio){
        console.log(portfolio);

        var index;
        for(var i = 0; i < portfolio.stocks.length; i++){
          if(portfolio.stocks[i].username === username){
            index = i;
          }
        }
        portfolio.stocks.splice(index, 1);
        // To do: add logic for selling all stocks vs partial amount
        // To do: add a way to optimize for loop?
      })
      .fail(function(error){
        console.log(error);
      });
  }
};
