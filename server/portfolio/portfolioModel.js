var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PortfolioSchema = new Schema({
 username    : String, // user name
 cash_balance: Number,
 stocks: Array
});

var Portfolio = mongoose.model('Portfolio', PortfolioSchema);

module.exports = Portfolio;
