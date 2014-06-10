var crypto = require('crypto');
var UserMode = require('../models').User;
var User = require('../proxy').User;
var Post = require('../proxy').Post;

exports.reg = function (req, res) {
    res.render('reg');
}
/**
 * 用户注册
 * @param req
 * @param res
 * @returns {*|Server}
 */
exports.doReg = function (req, res) {
    //檢驗用戶兩次輸入的口令是否一致
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', '兩次輸入的口令不一致');
        return res.redirect('/reg');
    }

    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');


    var newUser = new UserMode({
        name: req.body.username,
        password: password
    });

    //检查用户名是否存在
    User.get(newUser.name, function (err, user) {
        if (user) {
            err = '用户名已经存在';
        }
        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }
        //如果不存在就增加用户
        User.save(newUser, function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }
            //将注册好的user 存入session中
            req.session.user = newUser;
            req.flash('success', '注册成功');
            res.redirect('/');
        });
    });
}
/**
 * 用户登录
 * @param req
 * @param res
 */
exports.login = function (req, res) {
    res.render('login');
}

exports.doLogin = function (req, res) {
    //生成口令的散列值
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/login');
        }
        if (user.password != password) {
            req.flash('error', '用户密码错误');
            return res.redirect('/login');
        }
        req.session.user = user;
        req.flash('success', '登录成功');
        res.redirect('/');
    });
}
/**
 * 退出登录成功
 * @param req
 * @param res
 */
exports.logout = function (req, res) {
    req.session.user = null;
    req.flash('success', '退出登录成功');
    res.redirect('/');
}

exports.get_user = function (req, res) {
    User.get(req.params.user, function (err, user) {
        if (!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/');
        }
        Post.get(user.name, function (err, posts) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/');
            }
            res.render('user', {
                title: user.name,
                posts: posts
            });
        });
    });
}
