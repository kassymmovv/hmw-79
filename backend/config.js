const path = require('path');
const rootPath = __dirname;


module.exports = {
    rootPath,
    uploadPath: path.join(rootPath,'public','uploads'),
    port: 1212,
    database: {
        host     : 'localhost',
        user     : 'user',
        password : '03092000Kg',
        database : 'study'
    }
};