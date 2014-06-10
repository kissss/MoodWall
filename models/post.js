var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moment = require('moment');

var PostSchema = new Schema({
    user: { type: String },
    post: { type: String },
    time: { type: String, default: moment().format("YYYY-MM-DD HH:mm:ss") }
});

mongoose.model('Post', PostSchema);
