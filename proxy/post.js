var Post = require('../models').Post;
/**
 * 获取所有的心情
 */
exports.get = function (username, callback) {
    var query = {};
    if (username) {
        query.user = username;
    }
    Post.find(query).sort({"time": -1}).exec(function (err, posts) {
        if (err) {
            console.log(err);
            return;
        }
        callback(err, posts);
    });
};

exports.save = function (post, callback) {
    post.save(function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
        callback(err);
    });
};