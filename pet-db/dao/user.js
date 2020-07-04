
const userModel = require('./models/userModel')

module.exports = {
    get: async ({page, limit}) => {
        const data = await userModel.find({}).skip((page - 1) * limit).limit(limit)
        const total = await userModel.countDocuments()
        return {data, total}
    }
}