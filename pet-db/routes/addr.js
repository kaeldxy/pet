
var express = require('express');
var router = express.Router();

const addrService = require('../service/addr.js')

router.get('/get', async function (req, res, next) {
    const { userId } = req.query
    res.send(await addrService.get({ userId }))
});


router.post('/add', async function (req, res, next) {
    res.send(await addrService.add(req.body))
});


router.post('/update', async function (req, res, next) {
    res.send(await addrService.update(req.body))
});


router.post('/del', async function (req, res, next) {
    const { addrId } = req.body
    res.send(await addrService.del({ addrId }))
});



module.exports = router;
