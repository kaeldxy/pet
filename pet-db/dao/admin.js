const adminModel = require('./models/adminModel.js')
module.exports = {
    reg: async data => {
        const { account, phone } = data
        const data1 = await adminModel.find({ $or: [{ account }, { phone }] })
        if (data1.length !== 0) {
            return { statu: false, msg: '注册失败,账号或者手机已被注册' }
        } else {
            await adminModel.create(Object.assign(data, { status: 'pass' }))
            return { statu: true, msg: '注册成功' }
        }
    },
    login: async data => {
        const result = await adminModel.findOne(data)
        if (result) {
            if (result.status === 'pass') {
                return { statu: true, msg: '登录成功', name: result.name, position: result.position }
            }
            return { statu: false, msg: '登录失败， 当前状态未激活' }
        } else {
            return { statu: false, msg: '登录失败, 账号或密码错误' }
        }
    },
    get: async ({ page, limit, position }) => {
        page = ~~page
        limit = ~~limit
        const docs = await adminModel.find({position})
        const data = docs.slice((page - 1) * limit, (limit * page))
        return { data, total: docs.length }
    },
    del: async _id => {
        await adminModel.deleteOne({_id})
        return {statu: true, msg: '删除成功'}
    }
}