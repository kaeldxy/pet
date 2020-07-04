var express = require('express');
var router = express.Router();
const adminService = require('../service/admin.js')
const jwt = require("jsonwebtoken");
const { crypt, secret } = require('../utils/encrypt.js')

router.post('/reg', async function (req, res, next) {
  const { password } = req.body
  res.send(await adminService.reg(Object.assign(req.body, { password: crypt(password) })))
});

router.post('/login', async function (req, res, next) {
  const { password } = req.body
  const result = await adminService.login(Object.assign(req.body, { password: crypt(password) }))
  if(result.statu){
    const token = jwt.sign(
      { account: req.body },
      secret,
      {
        expiresIn: 3 * 60 * 60 // 秒
      }
    );
    Object.assign(result, {token})
  }
  res.send(result)
});

router.get('/get', async function(req, res, next){
  const {page, limit, position} = req.query
  const data = await adminService.get({page, limit, position})
  res.send(data)
})
router.post('/del', async function(req, res, next){
  const {_id} = req.body
  const data = await adminService.del(_id)
  res.send(data)
})
module.exports = router;
