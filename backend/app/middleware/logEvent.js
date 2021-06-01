// 日志记录器文件，将监听各种事件
// 来自合约：
//  - 添加商品成功
//  - 添加商品失败
//  - 支付订单结果
//  - 中断订单结果
//  - 完成订单结果
// 来自userController
//  - 用户登陆
//  - 用户登出

var { logFile } = require('../../config');

const fs = require('fs');

var EventEmitter = require('events').EventEmitter;

// create event listener
var event = new EventEmitter();

// trigger when add product success or not
// if success, it will also record product detail info
event.on("AddProductResult", (result)=> {
    try {
        // record the current time
        var myTime = new Date();
        var logTime = '['+ myTime.toLocaleString() + ']';
        if (result.success) {
            var logContent = "AddProductResult: True;ProductInfo:" + JSON.stringify(result.ProductInfo);
        } else {
            var logContent = "AddProductResult: False";
        }
        var log = fs.createWriteStream(logFile, {
            flags: 'a',
            encoding: 'utf8',
            autoClose: true
        });
        log.write(logTime + logContent + '\n');
        // output to console to display
        console.log('[Log]' + logTime + logContent + '\n');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
});

// trigger when launch deal success or not
// if success, it will also record deal detail info
event.on("LaunchDealResult", (result)=> {
    try {
        // generate current time
        var myTime = new Date();
        var logTime = '['+ myTime.toLocaleString() + ']';
        // record dealinfo
        if (result.success) {
            var logContent = "LaunchDealResult: True;DealInfo:" + JSON.stringify(result.DealInfo);
        } else {
            var logContent = "LaunchDealResult: False";
        }
        var log = fs.createWriteStream(logFile, {
            flags: 'a',
            encoding: 'utf8',
            autoClose: true
        });
        log.write(logTime + logContent + '\n');
        console.log('[Log]' + logTime + logContent + '\n');
        return true;
    } catch(e) {
        console.log(e);
        return false;
    }
});

// trigger when pay for one deal success or not
// record the deal's address
event.on("PayDealResult", (result)=> {
    try {
        var myTime = new Date();
        var logTime = '['+ myTime.toLocaleString() + ']';
        var logContent = "PayDealResult:" + result.success + ";" + "dealAddress:" + JSON.stringify(result.dealAddress);
        var log = fs.createWriteStream(logFile, {
            flags: 'a',
            encoding: 'utf8',
            autoClose: true
        });
        log.write(logTime + logContent + '\n');
        console.log('[Log]' + logTime + logContent + '\n');
        return true;

    } catch (e) {
        console.log(e);
        return false;
    }
});

// trigger when abort one deal success or not
// record the deal's address
event.on("AbortDealResult", (result)=> {
    try {
        var myTime = new Date();
        var logTime = '['+ myTime.toLocaleString() + ']';
        var logContent = "AbortDealResult:" + result.success + ";" + "dealAddress:" + JSON.stringify(result.dealAddress);
        var log = fs.createWriteStream(logFile, {
            flags: 'a',
            encoding: 'utf8',
            autoClose: true
        });
        log.write(logTime + logContent + '\n');
        console.log('[Log]' + logTime + logContent + '\n');
        return true;

    } catch(e) {
        console.log(e);
        return false;
    }

});

// trigger when finish one deal success or not
// record the deal's address
event.on("FinishDealResult", (result)=> {
    try {
        // record the current time
        var myTime = new Date();
        var logTime = '['+ myTime.toLocaleString() + ']';
        var logContent = "PayDealResult:" + result.success + ";" + "dealAddress:" + JSON.stringify(result.dealAddress);
        var log = fs.createWriteStream(logFile, {
            flags: 'a',
            encoding: 'utf8',
            autoClose: true
        });
        log.write(logTime + logContent + '\n');
        console.log('[Log]' + logTime + logContent + '\n');
        return true;

    } catch(e) {
        console.log(e);
        return false;
    }

});


// user authenticate about
///
// trigger when user login 
event.on("Login", (result) => {
    try {
        // record the current time
        var myTime = new Date();
        var logTime = '['+ myTime.toLocaleString() + ']';
        var logContent = "Login UserAddress: " + result.address;
        var log = fs.createWriteStream(logFile, {
            flags: 'a',
            encoding: 'utf-8',
            autoClose: true
        });
        log.write(logTime + logContent + '\n');
        console.log('[Log]' + logTime + logContent + '\n');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
})

// trigger when user logout
event.on("Logout", (result) => {
    try {
        // record the current time
        var myTime = new Date();
        var logTime = '['+ myTime.toLocaleString() + ']';
        var logContent = "Logout UserAddress: " + result.address;
        var log = fs.createWriteStream(logFile, {
            flags: 'a',
            encoding: 'utf-8',
            autoClose: true
        });
        log.write(logTime + logContent + '\n');
        console.log('[Log]' + logTime + logContent + '\n');
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
})

module.exports = event;
