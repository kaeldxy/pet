var express = require('express');
var router = express.Router();

const orderService = require('../service/order.js')

router.get('/get', async function (req, res, next) {  //page limit type dependQuery{petId: ''}
    res.send(await orderService.get(req.query))
});
router.post('/del', async function (req, res, next) {  //page limit type dependQuery{petId: ''}
    res.send(await orderService.del(req.body))
});
router.post('/add', async function (req, res, next) {  //page limit type dependQuery{petId: ''}
    res.send(await orderService.add(req.body))
});
module.exports = router;
