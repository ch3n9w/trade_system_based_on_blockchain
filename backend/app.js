const Koa = require('koa');
const KoaBody = require('koa-body');
const Session = require('koa-session');
const KoaStatic = require('koa-static');
// const KoaStatic = require('koa-static');

var app = new Koa();

let { port, staticDir, uploadDir } = require('./config');

app.use(KoaStatic(staticDir));
app.use(KoaStatic(uploadDir));

const cros = require('./app/middleware/cros');
app.use(cros);

const error = require('./app/middleware/error');
app.use(error);


const CONFIG = require('./app/middleware/session');
// app.keys = ['session app keys'];
// [2021-2-22] i use the md5 of 'ch4ser' as app key
app.keys = ['f2f959ca2d2730a65a8f87c697f8ff0b'];
app.use(Session(CONFIG, app));

// 判断是否登录
const isLogin = require('./app/middleware/isLogin');
app.use(isLogin);

app.use(async (ctx, next) => {
  ctx.state.user = ctx.session.user;
  await next();
});


// 处理请求体数据
const koaBodyConfig = require('./app/middleware/koaBodyConfig');
app.use(KoaBody(koaBodyConfig));

// app.use(KoaStatic(path.join("/upload")));

const Routers = require('./app/routers');
app.use(Routers.routes()).use(Routers.allowedMethods());

app.listen(port, () => {
    console.log(`Service start at ${port} !`);
})

const listener = require('./app/listener/listener');

listener.start();

