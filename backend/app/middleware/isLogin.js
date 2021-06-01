
module.exports = async (ctx, next) => {
    if (ctx.url.startsWith('/user/')) {
        if (!ctx.session.authenticated) {
            ctx.body = {
                code: '401',
                msg: '用户没有登录，请登录后再操作'
            }
            return;
        }
    }
    await next();
}
