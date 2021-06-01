// 后台查看日志路由

const Router = require('koa-router');
const logController = require('../../controllers/logController');

let logRouter = new Router();

logRouter
    .get('/log', logController.Auth);

module.exports = logRouter;
