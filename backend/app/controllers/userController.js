// 用户登陆和登出控制
// 接收用户的登陆请求，发送nonce值并接收数字签名，解密验证如果通过就登陆成功
// 登陆成功之后设置jwt为session

const {jwt_secret} = require('../../config'); 
var logListener = require('../middleware/logEvent');
const { recoverPersonalSignature } = require('eth-sig-util');
// import { recoverPersonalSignature } from 'eth-sig-util';
// import { bufferToHex } from 'ethereumjs-util';
const { bufferToHex } = require('ethereumjs-util')
const jwt = require('jsonwebtoken');

const userDao = require('../models/dao/userDao');
const counterDao = require('../models/dao/counterDao');

module.exports = {
    // Register: async ctx => {
    // let {publicAddress} = ctx.request.body;
    // await userDao.addNewUser(publicAddress);
    // let user = await userDao.findUserByAddress(publicAddress);
    // let nonce = user.nonce;
    // ctx.body = {
    // code: '005',
    // nonce
    // };
    // },

    // if havent registed, system will register and login automatically, 
    // while logining directly is the same procedule. 
    LoginAndRegister: async ctx => {
        try {
            if (ctx.session.authenticated) {
                ctx.body = {
                    code: '008'
                };
            } else {
                let {publicAddress} = ctx.request.body;
                let user = await userDao.findUserByAddress(publicAddress);
                if ( user ) {
                    let nonce = user.nonce;
                    ctx.body = {
                        code: '006',
                        nonce
                    };
                } else {
                    // the address havent been registered, try to redirect it to register router
                    // ctx.status = 303;
                    // ctx.redirect('/register');
                    // the address havent been registered, try to register it

                    // the counter of user collections is used for the autoIncrement of user id 
                    // if the counter not exist, then create and init it.
                    var userCounter_exist = await counterDao.SequenceExist('user_id');
                    // console.log('userCounter_exist: ' + userCounter_exist);
                    if ( !userCounter_exist ) await counterDao.InitValue('user_id');

                    // then add new user
                    await userDao.addNewUser(publicAddress);
                    let user = await userDao.findUserByAddress(publicAddress);
                    let nonce = user.nonce;
                    // console.log(nonce);
                    ctx.body = {
                        code: '006',
                        nonce
                    };

                }
            }

        } catch (e) {
            console.error(e);
        }
    },

    Auth: async ctx => {
        try {
            let { signature, publicAddress } = ctx.request.body;
            // let signature = ctx.request.query["signature"];
            // let publicAddress = ctx.request.query["publicAddress"];
            let user = await userDao.findUserByAddress(publicAddress);
            const msg = `I am signing my one-time nonce: ${user.nonce}`;

            const msgBufferHex = bufferToHex(Buffer.from(msg, 'utf8'));
            const address = recoverPersonalSignature({
                data: msgBufferHex,
                sig: signature,
            });

            // The signature verification is successful if the address found with
            // sigUtil.recoverPersonalSignature matches the initial publicAddress

            if (address.toLowerCase() === publicAddress.toLowerCase()) {
                // login success , refresh nonce and set session for user
                await userDao.refreshNonce(publicAddress);
                // then create session 
                let token = jwt.sign(
                    {
                        address: publicAddress,
                    },
                    jwt_secret
                );

                ctx.session.jwt = token;
                // make the session valid
                ctx.session.authenticated = true;

                logListener.emit(
                    "Login",
                    {
                        address: publicAddress
                    }
                );

                ctx.redirect('/');

                ctx.body = {
                    code: '007'
                };



            } else {
                // login fail !
                ctx.body = {
                    code: '008'
                };
            }

        } catch (e) {
            console.error(e);
        }

    },
    Logout: async ctx => {
        try {
            if (ctx.session.authenticated) {
                var seller = jwt.verify(ctx.session.jwt, jwt_secret);
                var address = seller.address.toLowerCase();
                ctx.session.authenticated = false;
                logListener.emit(
                    "Logout",
                    {
                        address: address
                    }
                );
            } else {
                ctx.body = {
                    code: '008'
                };
            }
        } catch (e) {
            console.error(e);
        }
    }
}
