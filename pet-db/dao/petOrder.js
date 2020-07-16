
const petOrderModel = require('./models/petOrderModel.js')

module.exports = {
    get: async ({ page, limit, dependQuery }) => {
        const petOrders = await petOrderModel.find(dependQuery)
            .populate({ path: 'petId' })
            .populate({ path: 'userId' })
            .populate({ path: 'shopId' })
            .populate({ path: 'adminId' })
            .populate({ path: 'addrId' }).skip((page - 1) * limit).limit(limit).lean()
        const total = await petOrderModel.find(dependQuery).countDocuments()
        return { data: petOrders, total }
    },
    del: async _id => {
        await petOrderModel.deleteOne({ _id })
        return { statu: true, msg: '订单删除成功' }
    },
    add: async orders => {
        await petOrderModel.insertMany(orders)
    }
}