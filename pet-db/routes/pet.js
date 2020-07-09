const express = require('express');
const router = express.Router();
const petService = require("../service/pet")
const multer = require('multer');
const path = require("path")
const fs = require("fs");


router.post('/add', async function (req, res, next) {
    res.send(await petService.add(req.body))
});

router.get('/get', async function (req, res, next) {    
    res.send(await petService.get(req.query))
});

router.post('/update', async function (req, res, next) {
    res.send(await petService.update(req.body))
});
router.post('/del', async function (req, res, next) {
    const { _id } = req.body;
    res.send(await petService.del(_id))
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