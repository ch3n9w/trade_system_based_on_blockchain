const { server_domain } = require('../../config');

module.exports = async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', server_domain);
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    await next();
};
