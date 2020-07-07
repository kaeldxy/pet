
const addrModel = require('./models/addrModel.js');

module.exports = {
    get: async ({ userId }) => {
        const addrs = await addrModel.find({ userId })
        return { addrs }
    },
    add: async addData => {
        await addrModel.create(addData)
        return { statu: true, msg: '添加成功' }
    },
    update: async updateData => {
        const doc = await addrModel.findOne({ _id: updateData._id })
        Object.assign(doc, updateData)
        await doc.save()
        return { statu: true, msg: '修改成功' }
    },
    del: async ({ _id }) => {
        await addrModel.deleteOne({ _id })
        return { statu: true, msg: '删除成功' }
    },
}