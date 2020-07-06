
const myseverModel = require('./models/myseverModel')
const mysevermidModel = require('./models/mysevermidModel')
const mongoose = require('mongoose')
module.exports = {
    get: async ({ page, limit, adminId }) => {
        page = ~~page
        limit = ~~limit
        const result = await myseverModel.find({}).lean()
        const arr = result.filter(item => item.adminId == adminId)
        const total = arr.length
        const data = arr.slice((page - 1) * limit, (limit * page)) 
        return { data, total }
    },
    del: async (_id) => {
        await myseverModel.deleteOne({ _id })
        return { statu: true, msg: '删除成功' }
    },
    update: async updateData => {
        const { _id: myseverId } = updateData
        const doc = await myseverModel.findOne({ _id })
        const { shopIdDoc } = updateData
        delete updateData.shopIdDoc
        Object.assign(doc, updateData)
        await doc.save()
        await mysevermidModel.deleteMany({myseverId: mongoose.Types.ObjectId(myseverId)})
        const docs = shopIdDoc.map(item => ({shopId: item, myseverId}))
        await mysevermidModel.insertMany(docs)
        return { statu: true, msg: '修改成功' }
    },
    add: async addData => {
        console.log(addData.adminId);
        const { shopIdDoc } = addData
        const { _id: myseverId } = await myseverModel.create(addData)
        const docs = shopIdDoc.map(item => ({ shopId: item, myseverId }));
        await mysevermidModel.insertMany(docs)
        return { statu: true, msg: '新增成功' }
    }
}