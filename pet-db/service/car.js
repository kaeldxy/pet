
const carDao = require('../dao/car.js')

module.exports = {
    get: async conditin => await carDao.get(conditin),
    del: async conditon => await carDao.del(conditon),
    clear: async conditon => await carDao.clear(conditon),
    add: async addData => await carDao.add(addData)
}