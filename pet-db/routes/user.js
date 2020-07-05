var express = require('express');
var router = express.Router();

const userService = require('../service/user.js')

router.get('/get', async function(req, res, next) {
  let {page, limit} = req.query
  page = ~~page
  limit = ~~limit
  res.send(await userService.get({page, limit}))
});

module.exports = router;
