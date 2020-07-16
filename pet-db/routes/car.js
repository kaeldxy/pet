
var express = require('express');
var router = express.Router();

const carService = require('../service/car.js')

router.get('/get', async function (req, res, next) {
    res.send(await carService.get(req.query))
});


router.post('/add', async function (req, res, next) {
    res.send(await carService.add(req.body))
});


router.post('/clear', async function (req, res, next) {
    res.send(await carService.clear(req.body))
});


router.post('/del', async function (req, res, next) {
    res.send(await carService.del(req.body))
});



module.exports = router;
