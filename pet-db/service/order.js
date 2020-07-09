

const petOrderDao = require('../dao/petOrder.js')
const myseverOrderDao = require('../dao/myseverOrder.js')
const goodOrderDao = require('../dao/goodOrder.js')
const petOrder = require('../dao/petOrder.js')

const allOrderDao = {
    petOrderDao,
    myseverOrderDao,
    goodOrderDao
}

const selcetOrderDao = type => allOrderDao[Object.keys(allOrderDao).find(item => new RegExp(type).test(item))]

module.exports = {
    get: async conditon => {
        let { page, limit, type, dependQuery } = conditon
        page = ~~page
        limit = ~~limit
        const orderDao = selcetOrderDao(type)
        dependQuery = JSON.parse(dependQuery)
        if (orderDao) {
            return await orderDao.get({ page, limit, dependQuery })
        } else {
            const petOrders = await petOrderDao.get({ page, limit, dependQuery })
            const myseverOrders = await myseverOrderDao.get({ page, limit, dependQuery })
            const goodOrders = await goodOrderDao.get({ page, limit, dependQuery })
            return { petOrders, myseverOrders, goodOrders }
        }
    }
}

