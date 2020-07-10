var express = require('express');
var router = express.Router();

const petOrderModel = require('../dao/models/petOrderModel')
const goodOrderModel = require('../dao/models/goodOrderModel')
const myseverOrderModel = require('../dao/models/myseverOrderModel')

router.get('/petOrderData', async function (req, res, next) {
    let petOrderData = await petOrderModel.find({}).lean()
    petOrderData = petOrderData.map(item => ({ num: item.num, time: item.time }))
    res.send({ petOrderData })
});

router.get('/goodOrderData', async function (req, res, next) {
    let goodOrderData = await goodOrderModel.find({}).lean()
    goodOrderData = goodOrderData.map(item => ({ num: item.num, time: item.time }))
    res.send({ goodOrderData })
});

router.get('/myseverOrderData', async function (req, res, next) {
    let myseverOrderData = await myseverOrderModel.find({}).lean()
    myseverOrderData = myseverOrderData.map(item => ({ num: item.num, time: item.time }))
    res.send({ myseverOrderData })
});

module.exports = router;
