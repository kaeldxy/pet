const adminDao = require('../dao/admin.js')
module.exports = {
    reg: async data => await adminDao.reg(data),
    login: async data => await adminDao.login(data),
    get: async data => await adminDao.get(data),
    del: async _id => await adminDao.del(_id),
    update: async updateData => await adminDao.update(updateData)
}