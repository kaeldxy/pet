
const goodModel = require('./models/goodModel')
const goodmidModel = require('./models/goodmidModel')

module.exports = {
    get: async ({ page, limit, adminId }) => {
        page = ~~page
        limit = ~~limit
        const data = await goodModel.find({ adminId }).skip((page - 1) * limit).limit(limit).lean()
        const total = await goodModel.find({ adminId }).countDocuments()
        const condition = data.map(item => ({ goodId: item._id }))
        const allShop = await goodmidModel.find({ $or: condition }).populate({ path: 'shopId', select: 'name' })
        data.forEach(item => {
            const goodId = item._id.toString()
            item.shop = allShop.filter(item => item.goodId == goodId).map(item => item.shopId)
        })
        
        return { data, total }
    },
    del: async (_id) => {
        await goodModel.deleteOne({ _id })
        await goodmidModel.deleteMany({goodId: _id})
        return { statu: true, msg: '删除成功' }
    },
    update: async updateData => {
        const { _id, shopIdArr } = updateData
        const doc = await goodModel.findOne({ _id })
        delete updateData.shopIdArr
        Object.assign(doc, updateData)
        await doc.save()
        await goodmidModel.deleteMany({ goodId: _id })
        const docs = shopIdArr.map(item => ({ shopId: item, goodId: _id }))
        await goodmidModel.insertMany(docs)
        return { statu: true, msg: '修改成功' }
    },
    add: async addData => {
        console.log(addData.adminId);
        const { shopIdArr } = addData
        delete addData.shopIdArr
        const {_id: goodId} = await goodModel.create(addData)
        const docs = shopIdArr.map(item => ({shopId: item, goodId}))
        await goodmidModel.insertMany(docs)
        return { statu: true, msg: '新增成功' }
    }
}