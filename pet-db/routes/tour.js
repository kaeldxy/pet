var express = require('express');
var router = express.Router();

const shopModel = require('../dao/models/shopModel')
const goodModel = require('../dao/models/goodModel')
const myseverModel = require('../dao/models/myseverModel')
const petModel = require('../dao/models/petModel')
const mysevermidModel = require('../dao/models/mysevermidModel');
const petmidModel = require('../dao/models/petmidModel');
const goodmidModel = require('../dao/models/goodmidModel');
const _ = require('lodash')


router.get('/getGood', async function (req, res, next) {
    let { page, limit } = req.query
    page = ~~page
    limit = ~~limit
    let docs = await goodmidModel.find({}).populate({path: 'goodId'}).lean()
    docs = _.unionBy(docs, `goodId._id`)
    docs = docs.slice((page - 1) * limit, (page * limit))
    const data = docs.map(item => {
        const it = {...item.goodId, shopId: item.shopId, goodId: item.goodId._id}
        delete it._id
        return it
    })
    res.send(data)
});

router.get('/getPet', async function (req, res, next) {
    let { page, limit } = req.query
    page = ~~page
    limit = ~~limit
    let docs = await petmidModel.find({}).populate({path: 'petId'}).lean()
    docs = _.unionBy(docs, `petId._id`)
    docs = docs.slice((page - 1) * limit, (page * limit))
    const data = docs.map(item => {
        const it = {...item.petId, shopId: item.shopId, petId: item.petId._id}
        delete it._id
        return it
    })
    res.send(data)
});

router.get('/getMysever', async function (req, res, next) {
    let { page, limit } = req.query
    page = ~~page
    limit = ~~limit
    let docs = await mysevermidModel.find({}).populate({path: 'myseverId'}).lean()
    docs = _.unionBy(docs, `myseverId._id`)
    docs = docs.slice((page - 1) * limit, (page * limit))
    const data = docs.map(item => {
        const it = {...item.myseverId, shopId: item.shopId, myseverId: item.myseverId._id}
        delete it._id
        return it
    })
    res.send(data)
});

router.get('/getShop', async function (req, res, next) {
    let { page, limit } = req.query
    page = ~~page
    limit = ~~limit
    res.send(await shopModel.find({}).skip((page - 1) * limit).limit(limit))
});


router.get('/getItem', async (req, res, next) => {
    const { type, _id } = req.query
    const itemModel = selcetModel(type)
    res.send(await itemModel.findOne({ _id }))
});

const allModel = { myseverModel, goodModel, petModel }
const allmidModel = { mysevermidModel, goodmidModel, petmidModel }
const selcetModel = type => allModel[Object.keys(allModel).find(key => new RegExp(type).test(key))]
const selcetmidModel = type => allmidModel[Object.keys(allmidModel).find(key => new RegExp(type).test(key))]





router.get('/getByClassify', async (req, res, next) => {
    
    let { page, limit, condition } = req.query
    page = ~~page
    limit = ~~limit
    condition = JSON.parse(condition)
    const model = selcetModel(condition.set)
    const midModel = selcetmidModel(condition.set)
    const docs = await model.find({ $or: condition.classify }).sort(condition.sort).lean()
    const allDocs = []
    for (let i = 0; i < docs.length; i++) {
        const item = docs[i];
        const midItem = await midModel.findOne({[`${condition.set}Id`]: item._id})
        if(midItem){
            Object.assign(item, {shopId: midItem.shopId, [`${condition.set}Id`]: item._id})
            delete item._id
            allDocs.push(item)
        }
    }
    const data = allDocs.slice((page - 1) * limit, (page * limit))
    const total = allDocs.length
    res.send({ data, total })
})

module.exports = router;
