
const userDao = require('../dao/user.js')

module.exports = {
    get: async condition => await userDao.get(condition),
    login: async ctx => await userDao.login(ctx)
}