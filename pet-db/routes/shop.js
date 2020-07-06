var express = require("express");
const shopService = require("../service/shop");
var router = express.Router();
router.post("/addShop", async function (req, res, next) {
  const { name,address, telephone, desc, adminId } = req.body;
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
  res.send(await shopService.findShop(req.query));
});
router.get("/findShop/all", async function (req, res, next) {
  res.send(await shopService.findAll(req.query));
});
router.post("/updataShop", async function (req, res, next) {  
  const { _id, name, address, telephone, desc, adminId } = req.body;  
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
