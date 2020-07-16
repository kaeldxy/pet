

const petOrderDao = require('../dao/petOrder.js')
const myseverOrderDao = require('../dao/myseverOrder.js')
const goodOrderDao = require('../dao/goodOrder.js')
const petOrder = require('../dao/petOrder.js')
const myseverOrder = require('../dao/myseverOrder.js')


const allOrderDao = {
    petOrderDao,
    myseverOrderDao,
    goodOrderDao
}

const selcetOrderDao = type => allOrderDao[Object.keys(allOrderDao).find(item => new RegExp(type).test(item))]

module.exports = {
    get: async conditon => { // 
        let { page, limit, type, dependQuery } = conditon
        page = ~~page
        limit = ~~limit
        dependQuery = JSON.parse(dependQuery)
        if (!dependQuery.status) {
            delete dependQuery.status
        }
        if (type) {
            const orderDao = selcetOrderDao(type)
            return await orderDao.get({ page, limit, dependQuery })
        } else {
            const petOrders = await petOrderDao.get({ page, limit, dependQuery })
            const myseverOrders = await myseverOrderDao.get({ page, limit, dependQuery })
            const goodOrders = await goodOrderDao.get({ page, limit, dependQuery })
            return { petOrders, myseverOrders, goodOrders }
        }
    },
    del: async ({ type, _id }) => {
        const orderDao = selcetOrderDao(type)
        return await orderDao.del(_id)
    },
    add: async ({ orders }) => {
        const petOrders = []
        const myseverOrders = []
        const goodOrders = []
        orders.forEach(order => {
            if (order.petId) {
                petOrders.push(order)
            } else if (order.myseverId) {
                myseverOrders.push(order)
            } else {
                goodOrders.push(order)
            }
        })
        await petOrderDao.add(petOrders)
        await myseverOrderDao.add(myseverOrders)
        await goodOrderDao.add(goodOrders)
        return { statu: true, msg: '添加成功' }
    }
}

