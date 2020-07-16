
const userModel = require('./models/userModel')

module.exports = {
    get: async ({ page, limit }) => {
        const data = await userModel.find({}).skip((page - 1) * limit).limit(limit)
        const total = await userModel.countDocuments()
        return { data, total }
    },
    login: async ctx => {
        const res = await userModel.findOne(ctx)
        if (res) {
            const { username, image, name, phone, _id } = res
            return { statu: true, msg: '登录成功', userInfo: { username, image, name, phone, _id } }
        } else {
            return { statu: false, msg: '登录失败，账号或密码错误' }
        }
    }
}