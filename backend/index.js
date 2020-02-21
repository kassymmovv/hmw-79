const express = require('express');
const cors = require('cors');

const config = require('./config');
const mySqlDb = require('./mysqlDb');
const main = require('./app/main');

const app = express();
app.use(cors());
app.use(express.static('public'));

app.use('/main',main);




const run  = async () => {

    await mySqlDb.connect();
    app.listen(config.port,() => {
            console.log(`HTTP Server started on ${config.port} port `)
        });
    process.on('exit', function() {
        mySqlDb.disconnect()
    });


};

run().catch(e => {
    console.error(e)
});

