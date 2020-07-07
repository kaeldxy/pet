const shopDao = require("../dao/shop");
const service = {};

service.createShop = async addData => await shopDao.createShop(addData);

service.findShop = async (condition) => await shopDao.findShop(condition);
service.del = async (condition) => await shopDao.del(condition);

service.updataShop = async (condition) => await shopDao.updataShop(condition);

module.exports = service;
