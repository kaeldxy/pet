const shopDao = require("../dao/shop");
const service = {};

service.createShop = async addData => await shopDao.createShop(addData);

service.findShop = async (condition) => await shopDao.findShop(condition);
service.del = async (condition) => await shopDao.del(condition);

service.updataShop = async (condition) => {
  const data = await shopDao.updataShop(condition);
  return data;
};

module.exports = service;
