
const myseverOrderModel = require('./models/myseverOrderModel.js')

module.exports = {
    get: async ({ page, limit, dependQuery }) => {
        const myseverOrders = await myseverOrderModel.find(dependQuery)
            .populate({ path: 'myseverId' })
            .populate({ path: 'userId' })
            .populate({ path: 'shopId' })
            .populate({ path: 'adminId' })
            .populate({ path: 'addrId' }).skip((page - 1) * limit).limit(limit).lean()
        const total = await myseverOrderModel.find(dependQuery).countDocuments()
        return { data: myseverOrders, total }
    },
    del: async _id => {
        await myseverOrderModel.deleteOne({ _id })
        return { statu: true, msg: '订单删除成功' }
    },
    add: async orders => {
        await myseverOrderModel.insertMany(orders)

    }
}