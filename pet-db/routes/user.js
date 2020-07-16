var express = require('express');
var router = express.Router();
const jwt = require("jsonwebtoken");
const { crypt, secret } = require('../utils/encrypt.js')
const userService = require('../service/user.js')

router.get('/get', async function (req, res, next) {
	let { page, limit } = req.query
	page = ~~page
	limit = ~~limit
	res.send(await userService.get({ page, limit }))
});

router.post('/login', async (req, res, next) => {
	req.body.pwd = crypt(req.body.pwd)
	const result = await userService.login(req.body)
	if (result.statu) {
		const token = jwt.sign(
			{},
			secret,
			{
				expiresIn: 3 * 60 * 60 // 秒
			}
		);
		Object.assign(result, { token })
	}
	console.log('result: ', result)
	res.send(result)
})
router.post('/check', (req, res, next) => {
	res.send({statu: true, msg: '用户登录态未过时'})
})

module.exports = router;
