// "data": {
//     "timestamp": 1417142049868,
//         "order_currency": "BTC",
//         "payment_currency": "KRW",
//         "bids": [
//         {
//             "quantity": "6.1189306",
//             "price": "504000"
//         },
//         {
//             "quantity": "10.35117828",
//             "price": "503000"
//         }
//     ],
//         "asks": [
//         {
//             "quantity": "2.67575",
//             "price": "506000"
//         },
//         {
//             "quantity": "3.54343",
//             "price": "507000"
//         }
//     ]
// }

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var bookSchema = new Schema({
    timestamp: Number,
    order_currency: String,
    payment_currency : String,
    bids :[Schema.Types.Mixed],
    asks :[Schema.Types.Mixed]
});

module.exports = mongoose.model('OrderBook', bookSchema);

