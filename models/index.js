/**
 * Created by Administrator on 14-6-10.
 */
var mongoose = require('mongoose');
var config = require('../settings');

mongoose.connect(config.db, function (err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});


//models
require('./post');
require('./user');


exports.Post = mongoose.model('Post');
exports.User = mongoose.model('User');


