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
service.findShop = async ({ limit, page }) => {
  const data = await shopDao.findShop({ limit, page });
  return data;
};
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
  let status = true,
    msg = "updata success";
  if (!data) {
    (status = false), (msg = "updata failed"), (data = 0);
  }
  return { status, msg, data };
};

module.exports = service;
