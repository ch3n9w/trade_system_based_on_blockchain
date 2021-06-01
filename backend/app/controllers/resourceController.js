// 静态资源处理器，主要负责图片的上传

// const fs = require('fs');
// const path = require('path');
// const crypto = require('crypto');


module.exports = {
    saveFile: async ctx => {
        try {
            // console.log(ctx.request.files.file.path);
            let filename = ctx.request.files.file.path.split('/');
            let index = filename.length - 1;
            filename = '/' + filename[index];
            console.log("[Controller] Upload image to:" + filename);

            ctx.body = {
                code: '007',
                filename
            };

        } catch (e) {
            console.error(e);
        }
    }
}
