
const myseverDao = require('../dao/mysever')
module.exports = {
    get: async condition => await myseverDao.get(condition),
    del: async _id => await myseverDao.del(_id)
}