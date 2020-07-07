

const petOrderDao = require('../dao/petOrder.js')
const myseverOrderDao = require('../dao/myseverOrder.js')
const goodOrderDao = require('../dao/goodOrder.js')

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
        return await orderDao.get({ page, limit, dependQuery })
    }
}

