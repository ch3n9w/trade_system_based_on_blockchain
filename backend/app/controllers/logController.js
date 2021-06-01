// 后台日志查看
// 通过cookie中的jwt中的publicAddress判断该用户是否具有查看日志的权限
// 通过授权的合约账户在config文件中

const fs = require('fs');
const {adminAddress, jwt_secret, logFile} = require('../../config');
const jwt = require('jsonwebtoken');
const { loadavg } = require('os');

 // get logfile content function
var GetLog = async function() {
    
    var logContent;
    // console.log(logFile);
    logContent = fs.readFileSync(
        logFile,
        {
            encoding: 'utf8',
            flag: 'r'
        }
    );
    return logContent;
}

module.exports = {
    Auth: async ctx => {
        // the session's address should be authenticated
        if (!ctx.session.authenticated){
            ctx.body = {
                code: '009',
                result: 0,
                msg: 'Please login first'
            };
            return;
        }

        

        var token = jwt.verify(ctx.session.jwt, jwt_secret);
        var userAddress = token.address;

        var compareAdminAddress = adminAddress.map(function(address){
            return address.toLowerCase();
        });
        
        // the user's address should be in admin's Address array
        if (compareAdminAddress.includes(userAddress)) {
            console.log("Fetching log...");
            // read logfile content and return it
            
            GetLog().then((log)=>{
                // console.log(log);
                ctx.body = {
                    code: '009',
                    result: 1,
                    msg: log
                };
            });
        } else {
            // if the user's address is not in admin's address array
            ctx.body = {
                code: '009',
                result: 0,
                msg: 'The account is not admin account'
            };
            
        }
    },

   
}
