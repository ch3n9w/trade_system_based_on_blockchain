const Router = require('koa-router');
const resourceController = require('../../controllers/resourceController')

let resourceRouter = new Router();

resourceRouter
    .post('/uploadimg', resourceController.saveFile);
    

module.exports = resourceRouter;
