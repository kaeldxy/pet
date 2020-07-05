var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require("path")
const fs = require("fs");
const { rootPath } = require("../utils/baseinfo.js")

const goodService = require('../service/good.js')

router.get('/get', async function (req, res, next) {
    res.send(await goodService.get(req.query))
});


router.post('/del', async function (req, res, next) {
    res.send(await goodService.del(req.body._id))
});

router.post('/update', async function (req, res, next) {
    res.send(await goodService.update(req.body))
});

router.post('/add', async function (req, res, next) {
    res.send(await goodService.add(req.body))
});

const goodUpload = multer({ dest: path.join(rootPath, "/public/images/good") });

router.post('/upload', goodUpload.array('goodImgs', 5), async function (req, res, next) {
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
        res.send({patharr});
    })()
});



module.exports = router;
