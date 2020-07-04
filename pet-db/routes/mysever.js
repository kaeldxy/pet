var express = require('express');
var router = express.Router();

const myseverService = require('../service/mysever.js')

router.get('/get', async function(req, res, next) {
  res.send(await myseverService.get(req.query))
});


router.post('/del', async function(req, res, next) {
  res.send(await myseverService.del(req.body._id))
});

module.exports = router;
