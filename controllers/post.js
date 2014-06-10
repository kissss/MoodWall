var Post = require('../proxy').Post;
var PostModel = require('../models').Post;
var moment = require('moment');


exports.index = function (req, res) {
    Post.get(null, function (err, posts) {
        if (err) {
            posts = [];
        }
        res.render('index', {
            posts: posts
        });
    });
}
exports.post = function (req, res) {
    //从session中得到当前登录的用户
    var currentUser = req.session.user;
    var post = new PostModel({
        user: currentUser.name,
        post: req.body.post,
        //根据需要的样式进行格式化
        time: moment().format("YYYY-MM-DD HH:mm:ss")
    });
    Post.save(post, function (err) {
        if (err) {
            req.flash('error', err);
            return res.redirect('/');
        }
        req.flash('success', '发表心情成功');
        res.redirect('/u/' + currentUser.name);
    });
}