
const myseverModel = require('./models/myseverModel')
const mysevermidModel = require('./models/mysevermidModel')

const mongoose = require('mongoose')

module.exports = {
    get: async ({ page, limit, adminId }) => {
        page = ~~page
        limit = ~~limit
        const data = await myseverModel.find({ adminId }).skip((page - 1) * limit).limit(limit).lean()
        const condition = data.map(item => ({ myseverId: item._id }))
        const allShop = await mysevermidModel.find({ $or: condition }).populate({ path: 'shopId', select: ['name'] }).lean()
        data.forEach(item => {
            const myseverId = item._id.toString()
            item.shop = allShop.filter(item => item.myseverId == myseverId).map(item => item.shopId)
        })
        const total = await myseverModel.find({ adminId }).countDocuments()
        return { data, total }
    },
    del: async (_id) => {
        await myseverModel.deleteOne({ _id })
        await mysevermidModel.deleteMany({ myseverId: _id })
        return { statu: true, msg: '删除成功' }
    },
    update: async updateData => {
        const { _id: myseverId } = updateData
        const doc = await myseverModel.findOne({ _id: myseverId })
        const { shopIdArr } = updateData
        delete updateData.shopIdArr
        Object.assign(doc, updateData)
        await doc.save()
        await mysevermidModel.deleteMany({ myseverId })
        const docs = shopIdArr.map(item => ({ shopId: item, myseverId }))
        await mysevermidModel.insertMany(docs)
        return { statu: true, msg: '修改成功' }
    },
    add: async addData => {
        console.log(addData.adminId);
        const { shopIdArr } = addData
        delete addData.shopIdArr
        const { _id: myseverId } = await myseverModel.create(addData)
        const docs = shopIdArr.map(item => ({ shopId: item, myseverId }));
        await mysevermidModel.insertMany(docs)
        return { statu: true, msg: '新增成功' }
    }
}