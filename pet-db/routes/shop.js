var express = require("express");
const shopService = require("../service/shop");
const multer = require('multer');
const path = require("path")
const fs = require("fs");
const { rootPath } = require("../utils/baseinfo.js");
const { log } = require("console");

var router = express.Router();
router.post("/addShop", async function (req, res, next) {
  res.send( await shopService.createShop(req.body));
});
router.get("/findShop", async function (req, res, next) {
  res.send(await shopService.findShop(req.query));
});
router.get("/delShop", async function (req, res, next) {
  res.send(await shopService.del(req.query));
});
router.post("/updataShop", async function (req, res, next) {     
  console.log(req.body)
  const data = await shopService.updataShop(req.body);
  res.send(data);
});

const shopUpload = multer({ dest: path.join(rootPath, "/public/images/shop") });
router.post('/upload', shopUpload.array('shopImgs', 5), async function (req, res, next) {
    const files = req.files;
    const len = files.length;
    const patharr = [];
    (async function name() {
        for (let i = 0; i < len; i++) {
            const item = files[i];
            const originalname = item.path;
            const newname = originalname + path.extname(item.originalname);
            const responsename = await new Promise((r) => {
                fs.rename(originalname, newname, error => {
                    if (error) throw error;
                    const responsename = newname.replace(rootPath + `${path.sep}public${path.sep}`, "");
                    r(responsename)
                })
            })
            patharr.push(responsename);
        }
        res.send({ patharr });
    })()
});


module.exports = router;
