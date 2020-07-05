
const goodDao = require('../dao/good')
module.exports = {
    get: async condition => await goodDao.get(condition),
    del: async _id => await goodDao.del(_id),
    update: async updateData => await goodDao.update(updateData),
    add: async addData => await goodDao.add(addData)
}