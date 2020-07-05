var express = require("express");
const shopService = require("../service/shop");

var router = express.Router();

/* GET home page. */
router.post("/addShop", async function (req, res, next) {
  const { name, telephone, desc, adminId } = req.body;
  const address = req.body.address.join(" ");
  const data = await shopService.createShop({
    name,
    address,
    telephone,
    desc,
    adminId,
  });
  res.send(data);
});
router.get("/findShop", async function (req, res, next) {
  let { limit, page } = req.query;
  limit = ~~limit;
  page = ~~page;
  const data = await shopService.findShop({ limit, page });
  res.send(data);
});
router.post("/updataShop", async function (req, res, next) {  
  const { _id, name, telephone, desc, adminId } = req.body;
  const address = req.body.address.join(" ");
  const data = await shopService.updataShop({
    _id,
    name,
    address,
    telephone,
    desc,
    adminId,
  });
  res.send(data);
});
module.exports = router;
