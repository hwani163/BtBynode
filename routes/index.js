var express = require('express');
const DbConnector = require('./modules/dbConnector.js');
const connector = new DbConnector();
const coins = ['BTC', 'ETH', 'DASH', 'LTC', 'ETC', 'XRP', 'BCH', 'XMR', 'ZEC', 'QTUM', 'BTG', 'EOS']
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("index.ejs");
});

router.get('/:coin', function(req, res, next) {
  let paramCoin = coingParamisGoodValue(req.params.coin);

  (async function () {
    let query = "SELECT DT,PRICE FROM "+paramCoin+"_PRICE WHERE DT IN(SELECT MAX(DT) FROM "+paramCoin+"_PRICE);";
    const result = await connector.selectQuery(query);
    res.send([
      parseInt(result[0].DT)
      ,parseInt(result[0].PRICE)
    ]);

    }());

});

router.get('/Cnt/:coin', function(req, res, next) {
  let paramCoin = coingParamisGoodValue(req.params.coin);
  (async function () {
      let query = "SELECT DT,PRICE FROM "+paramCoin+"_PRICE WHERE DT > DT-86400000;";
      const result = await connector.selectQuery(query);
      let tmparr = new Array();
      for (var i in result) {
        tmparr.push([parseInt(result[i].DT),parseInt(result[i].PRICE)]);
      }
      res.send(tmparr);

    }());

});

function coingParamisGoodValue(paramCoin){
  let a = "BTC";
    for (var i in coins) {
      if (coins[i]==paramCoin) {
        a = paramCoin;
      }
    }
    return a;
  }

module.exports = router;
