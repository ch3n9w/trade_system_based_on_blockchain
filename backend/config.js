const path = require('path');

module.exports = {
    port: 3000,
    uploadDir: path.resolve('./public/upload'), // 静态资源路径
    staticDir: path.resolve('./public/assets'),
    logFile: path.resolve('./logFile'),
    // 数据库连接设置
    // dbConfig: {
	// connectionLimit: 10,
	// host: 'localhost',
	// user: 'root',
	// password: '',
	// database: 'storeDB'
    // }
    // server_domain: 'http://172.22.92.64:8080',
    // server_domain: 'http://192.168.10.170:8080',
    server_domain: 'http://localhost:8080',
    chain_server: 'ws://www.ch4ser.top:8546',
    storeAddress: '0xB4ca8BD9342411Ad55DBAc82880508C18B4ab439',
    adminAddress: [
        '0x417FC763981e80243c1f4C595AC6Ce6810Ad5C27',
    ],
    jwt_secret: 'ch4sersjwtsecret'
}
