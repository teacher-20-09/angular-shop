var mongoose = require('mongoose');
//mongoose.Promise = global.Promise;
mongoose.connect('mongodb://user:user123@ds227171.mlab.com:27171/facebook_auth');
console.log("mongodb connect...")
module.exports = mongoose;