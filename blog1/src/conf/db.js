const env = process.env.NODE_ENV

// 配置
let MYSQL_CONF

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password:'6401928',
        port: '3306',
        database: 'myblog',
    }
}

if (env === 'production') {
    // 线上地址
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password:'6401928',
        port: '3306',
        database: 'myblog',
    }
}

module.exports = {
    MYSQL_CONF
}