/**
 * Created by Administrator on 14-6-10.
 */
var auth = require('./midderwares/auth');
var postController = require('./controllers/post');
var userController = require('./controllers/user');


module.exports = function (app) {

    //根路径
    app.get('/', postController.index);

    app.get('/reg', auth.checkNotLogin, userController.reg);
    // 提交用户注册
    app.post('/reg', auth.checkNotLogin, userController.doReg);

    app.get('/login', auth.checkNotLogin, userController.login);
    app.post('/login', auth.checkNotLogin, userController.doLogin);

    //用户登出操作
    app.get('/logout', auth.checkLogin, userController.logout);
    //得到这个用户所发送的心情
    app.get('/u/:user', userController.get_user);


    app.post('/post', auth.checkLogin, postController.post);
};

