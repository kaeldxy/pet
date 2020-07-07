const petDao = require("../dao/pet");
const service = {};

service.add = async (addData) => await petDao.add(addData);
service.get = async (query) =>await petDao.get(query);
service.update = async updateData => await petDao.update(updateData);
service.del = async _id => await petDao.del(_id);
module.exports = service