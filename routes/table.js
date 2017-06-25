var express = require('express');
var router = express.Router();

var mongoose    = require('mongoose');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
    // CONNECTED TO MONGODB SERVER
    console.log("Connected to mongod server");
});
mongoose.connect('mongodb://localhost/data/db');

var OrderBook = require('../scheme/OrderBook');
var api = require('../modules/api');
var book = new OrderBook({
        timestamp: 1417142049868
        , order_currency: "BTC"
        , payment_currency: "KRW"
        , bids: [{"quantity": "6.1189306", "price": "504000"}, {"quantity": "10.35117828", "price": "503000"}]
        , asks: [{"quantity": "2.67575", "price": "506000"}, {"quantity": "3.54343", "price": "507000"}]
    });






//조회
// OrderBook.find(function(err, books){
//     if(err) return res.status(500).send({error: 'database failure'});
//     res.json(books);
// });

book.save(function(err, book){
    if(err) return console.error(err);
    // console.dir(book.bids);

});








/* GET home page. */
router.get('/', function(req, res, next) {
    // OrderBook.find(function(err, books){
    //     if(err) return res.status(500).send({error: 'database failure'});
    //     console.log('zzzzzzzzzzzzzzzzzzzzz');
    //     console.log(books[0]);
    //     res.render('index', books[0]);
    // });
    let result = api.apiCall('/info/account',{
        order_currency:'BTC',
        payment_currency:'KRW'
    });

    result.then(result => {
        console.log(result);
        res.render('table',result);
    });




});

module.exports = router;
