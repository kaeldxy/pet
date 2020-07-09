
var express = require('express');
var router = express.Router();

const mongoose = require('mongoose')

const shopModel = require('../dao/models/shopModel')
const goodModel = require('../dao/models/goodModel')
const myseverModel = require('../dao/models/myseverModel')
const petModel = require('../dao/models/petModel')
const userModel = require('../dao/models/userModel')
const addrModel = require('../dao/models/addrModel.js')

const mysevermidModel = require('../dao/models/mysevermidModel');
const petOrderModel = require('../dao/models/petOrderModel');
const petmidModel = require('../dao/models/petmidModel');
const myseverOrderModel = require('../dao/models/myseverOrderModel.js')
const goodOrderModel = require('../dao/models/goodOrderModel.js')
const goodmidModel = require('../dao/models/goodmidModel');
const myseverOrder = require('../dao/myseverOrder');
const adminModel = require('../dao/models/adminModel')

router.post('/addshop', async (req, res, next) => {
    const { data } = req.body
    await shopModel.insertMany(data)
    res.send('1')
})
router.post('/addgood', async (req, res, next) => {
    const { data } = req.body
    await goodModel.insertMany(data)
    res.send('1')
})
router.post('/addmysever', async (req, res, next) => {
    const { data } = req.body
    await myseverModel.insertMany(data)
    res.send('1')
})
router.post('/addpet', async (req, res, next) => {
    const { data } = req.body
    await petModel.insertMany(data)
    res.send('1')
})
router.post('/addusers', async (req, res, next) => {
    const { users } = req.body
    await userModel.insertMany(users)
    res.send('1')
})
router.post('/addAddr', async (req, res, next) => {
    const { addrs } = req.body
    await addrModel.insertMany(addrs)
    res.send('1')
})
/// 塞数据

router.post('/addpetmid', async (req, res, next) => {
    const { allpetmids } = req.body
    await petmidModel.insertMany(allpetmids)
    res.send('1')
})
router.post('/addgoodmid', async (req, res, next) => {
    const { allgoodmids } = req.body
    await goodmidModel.insertMany(allgoodmids)
    res.send('1')
})
router.post('/addmysevermid', async (req, res, next) => {
    const { allmysevermids } = req.body
    await mysevermidModel.insertMany(allmysevermids)
    res.send('1')
})
// 赛中间表


router.get('/getShopId', async (req, res, next) => {
    const { adminId } = req.query
    let shopIds = await shopModel.find({ adminId }).lean()
    shopIds = shopIds.map(item => item._id)
    res.send({ shopIds })
})
router.get('/getAdminId', async (req, res, next) => {
    let adminIds = await adminModel.find({position: 'shop'}).lean()
    adminIds = adminIds.map(item => item._id)
    res.send({ adminIds })
})
router.get('/getAdmin', async (req, res, next) => {
    let admins = await adminModel.find({position: 'shop'}).lean()
    res.send({ admins })
})
router.get('/getPetId', async (req, res, next) => {
    const { adminId } = req.query
    let petIds = await petModel.find({ adminId }).lean()
    petIds = petIds.map(item => item._id)
    res.send({ petIds })
})
router.get('/getGoodId', async (req, res, next) => {
    const { adminId } = req.query
    let goodIds = await goodModel.find({ adminId }).lean()
    goodIds = goodIds.map(item => item._id)
    res.send({ goodIds })
})
router.get('/getMyseverId', async (req, res, next) => {
    const { adminId } = req.query
    let myseverIds = await myseverModel.find({ adminId }).lean()
    myseverIds = myseverIds.map(item => item._id)
    res.send({ myseverIds })
})
router.get('/getAddrId', async (req, res, next) => {
    const { userId } = req.query
    let addrIds = await addrModel.find({ userId }).lean()
    addrIds = addrIds.map(item => item._id)
    res.send({ addrIds })
})
router.get('/getUserId', async (req, res, next) => {
    let userIds = await userModel.find({}).lean()
    userIds = userIds.map(item => item._id)
    res.send({ userIds })
})


router.get('/getPetIdByShopId', async (req, res, next) => {
    const { shopId } = req.query
    const arr = await petmidModel.find({ shopId }).lean()
    const petIds = arr.map(item => item.petId)
    res.send({ petIds })
})
router.get('/getGoodIdByShopId', async (req, res, next) => {
    const { shopId } = req.query
    const arr = await goodmidModel.find({ shopId }).lean()
    const goodIds = arr.map(item => item.goodId)
    res.send({ goodIds })
})
router.get('/getMyseverIdByShopId', async (req, res, next) => {
    const { shopId } = req.query
    const arr = await mysevermidModel.find({ shopId }).lean()
    const myseverIds = arr.map(item => item.myseverId)
    res.send({ myseverIds })
})

// 获取ID



router.post('/addPetOrder', async (req, res, next) => {
    const { petOrders } = req.body
    await petOrderModel.insertMany(petOrders)
    res.send('1')
})
router.post('/addGoodOrder', async (req, res, next) => {
    const { goodOrders } = req.body
    await goodOrderModel.insertMany(goodOrders)
    res.send('1')
})
router.post('/addMyseverOrder', async (req, res, next) => {
    const { myseverOrders } = req.body
    await myseverOrderModel.insertMany(myseverOrders)
    res.send('1')
})









router.get('/testOrder', async (req, res, next) => {
    const { goodId, myseverId, petId } = req.query
    const myse = await myseverOrderModel.find({ myseverId }).populate({
        path: 'myseverId',
    })
    const goo = await goodOrderModel.find({ goodId }).populate({
        path: 'goodId',
    })
    const pe = await petOrderModel.find({ petId }).populate({
        path: 'petId',
    })
    res.send({
        myse, goo, pe
    })
})





module.exports = router