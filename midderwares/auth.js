/**
 * Created by Administrator on 14-6-10.
 */

/**
 * 验证是否登录
 * @param req
 * @param res
 * @param next
 * @returns {*|Server}
 */
exports.checkLogin = function (req, res, next) {
    if (!req.session.user) {
        req.flash('error', '未登录');
        return res.redirect('/login');
    }
    next();
}
/**
 * 验证是否没有登录
 * @param req
 * @param res
 * @param next
 * @returns {*|Server}
 */
exports.checkNotLogin = function (req, res, next) {
    if (req.session.user) {
        req.flash('error', '已经登录');
        return res.redirect('/');
    }
    next();
}