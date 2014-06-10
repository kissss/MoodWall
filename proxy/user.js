/**
 * Created by Administrator on 14-6-10.
 */
var User = require('../models').User;
/**
 * 增加用户
 * @param user
 * @param callback
 */
exports.save = function (user, callback) {
    user.save(function (err) {
        if (err) {
            console.log(err.message);
            return;
        }
        callback(err);
    });
};
/**
 * 得到一个用户
 * @param username
 * @param callback
 */
exports.get = function (username, callback) {
    User.findOne({"name": username}).sort({"time": -1}).exec(function (err, user) {
        if (err) {
            console.err(err);
            return;
        }
        callback(err, user);
    });
};
