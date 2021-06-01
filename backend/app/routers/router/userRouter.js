const Router = require('koa-router');
const userController = require('../../controllers/userController')

let userRouter = new Router();

userRouter
    .post('/login', userController.LoginAndRegister)
// use get method, otherwise the broswer will ban set-cookie
    .post('/auth', userController.Auth)
    .get('/logout', userController.Logout);

module.exports = userRouter;
