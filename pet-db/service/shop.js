const shopDao = require("../dao/shop");
const service = {};

service.createShop = async ({ name, address, telephone, desc, adminId }) => {
  const data = await shopDao.createShop({
    name,
    address,
    telephone,
    desc,
    adminId,
  });
  let status = true,
    msg = "insert success";
  if (!data) {
    (status = false), (msg = "insert failed"), (data = 0);
  }
  return { status, msg, data };
};

service.findShop = async (condition) => await shopDao.findShop(condition);
service.findAll = async (condition) => await shopDao.allShop(condition);

service.updataShop = async ({
  _id,
  name,
  address,
  telephone,
  desc,
  adminId,
}) => {
  const data = await shopDao.updataShop({
    _id,
    name,
    address,
    telephone,
    desc,
    adminId,
  });

  return data;
};

module.exports = service;
