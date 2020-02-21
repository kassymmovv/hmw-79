const path = require('path');
const express = require('express');
const multer = require('multer');
const nanoid = require('nanoid');

const mySqlDb = require('../mysqlDb');
const config = require('../config');

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, config.uploadPath)
    },
    filename:(req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', async (req,res) => {
    const messages = await mySqlDb.getConnection().query('SELECT * FROM `products`');
    res.send(messages)
});

router.get('/:id', async (req,res) => {
    const messages = await mySqlDb.getConnection().query('SELECT * FROM `products` WHERE `id` =?',req.params.id);
    const itemId = messages[0];
    if (!itemId){
        return res.status(404).send({item: 'Not found'})
    }
    res.send(itemId)
});

router.post('/', upload.single('image'), async (req,res) => {
    const mess = req.body;
    if(req.file){
        mess.image = req.file.filename;
    }


   const resultId = await mySqlDb.getConnection().query(
        'INSERT INTO `products` (`category_id`,`title`,`price`,`description`,`location_id`,`image`) VALUES' +
        '(?,?,?,?,?,?)',
        [mess.categoryId,mess.title,mess.price,mess.description,mess.locationId,mess.image]
    );
    const result = await mySqlDb.getConnection().query('SELECT * FROM `products` WHERE `id` =?',resultId.insertId);

    res.send(result)

});
router.delete('/:id', async (req,res) => {

   const result = await mySqlDb.getConnection().query('DELETE FROM `products` WHERE `id` = ?',req.params.id);
    if(result){
        res.send('Successful deleting')
    }

});


module.exports = router;