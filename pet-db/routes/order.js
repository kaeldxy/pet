var express = require('express');
var router = express.Router();

const orderService = require('../service/order.js')

router.get('/get', async function (req, res, next) {  //page limit type dependQuery{petId: ''}
    res.send(await orderService.get(req.query))
});

module.exports = router;
