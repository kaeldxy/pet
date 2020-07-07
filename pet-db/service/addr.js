
const addrDao = require('../dao/addr.js')

module.exports = {
    get: async ({ userId }) => await addrDao.get({ userId }),
    del: async ({ addrId }) => await addrDao.del({ addrId }),
    update: async updateData => await addrDao.update(updateData),
    add: async addData => await addrDao.add(addData)
}