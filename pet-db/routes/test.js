
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')

const shopModel = require('../dao/models/shopModel')
const goodModel = require('../dao/models/goodModel')
const myseverModel = require('../dao/models/myseverModel')
const petModel = require('../dao/models/petModel')

router.post('/testshop', async (req, res, next) => {
    const { data } = req.body
    await shopModel.insertMany(data)
    res.send('1')
})
router.post('/testgood', async (req, res, next) => {
    const { data } = req.body
    await goodModel.insertMany(data)
    res.send('1')
})
router.post('/testmysever', async (req, res, next) => {
    const { data } = req.body
    await myseverModel.insertMany(data)
    res.send('1')
})
router.post('/testpet', async (req, res, next) => {
    const { data } = req.body
    await petModel.insertMany(data)
    res.send('1')
})
router.post('/testApp', async (req, res, next) => {
    const { adminId } = req.body
    const data = await goodModel.find({ adminId })
    res.send(data)
})
module.exports = router