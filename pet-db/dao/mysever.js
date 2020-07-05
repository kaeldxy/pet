
const myseverModel = require('./models/myseverModel')

module.exports = {
    get: async ({page, limit, _id}) => {
        page = ~~page
        limit = ~~limit
        const result = await myseverModel.find({}).lean()
        const arr = result.filter(item => item.adminId === _id)
        const total = arr.length
        const data = arr.slice((page - 1) * limit, (limit * page))
        return {data,  total}
    },
    del: async (_id) => {
        await myseverModel.deleteOne({_id})
        return {statu: true, msg: '删除成功'}
    }
}