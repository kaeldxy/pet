const express = require('express');
const router = express.Router();
const petService = require("../service/pet")
const multer = require('multer');
const path = require("path")
const fs = require("fs");


router.post('/add', async function (req, res, next) {
    let { dates } = req.body;
    res.send(await petService.servicepet(dates))
});
router.post('/get', async function (req, res, next) {
    let { page, limit } = req.body;
    page = ~~page;
    limit = ~~limit;
    res.send(await petService.servicegetpet({ page, limit }))
});
router.post('/updata', async function (req, res, next) {
    let datee = req.body;;
    res.send(await petService.servicupdatapet(datee))
});
router.post('/delet', async function (req, res, next) {
    let { uers } = req.body;
    res.send(await petService.servicdeletpet(uers))
});



const { rootPath } = require("../utils/baseinfo")
const upload = multer({ dest: path.join(rootPath, "/public/images/petImages") });
router.post('/upload', upload.array('episode', 5), async function (req, res, next) {
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

router.post('/deletePic', async function (req, res, next) {//** 
    const { file } = req.body;
    fs.unlink(path.join(rootPath, "public", file), function (err) {
        if (err) res.send(false);
        else res.send(true);
    })
});

module.exports = router