
const petModel = require("./models/petModel");
const petmidModel = require("./models/petmidModel");
const user = require("./user");

const dao = {};

dao.add = async (addData) => {
    const { shopIdArr } = addData
    delete addData.shopIdArr
    const { _id } = await petModel.create(addData)
    const arr = shopIdArr.map(item => ({ shopId: item, petId: _id }))
    await petmidModel.insertMany(arr)
    return { statu: true, msg: '添加成功' }
}
dao.get = async ({ page, limit, adminId }) => {
    page = ~~page
    limit = ~~limit
    const rows = await petModel.find({ adminId }).skip((page - 1) * limit).limit(limit).lean()
    const count = await petModel.find({ adminId }).countDocuments()
    const condition = rows.map(item => ({ petId: item._id }))
    const allShop = await petmidModel.find({ $or: condition }).populate({ path: 'shopId', select: 'name' }).lean()
    rows.forEach(item1 => {
        item1.shop = allShop.filter(item => item.petId == item1._id.toString()).map(item => item.shopId)
    })
    return { rows, count }
}

dao.update = async (updateData) => {
    const { shopIdArr } = updateData
    delete updateData.shopIdArr
    const doc = await petModel.findOne({ _id: updateData._id })
    Object.assign(doc, updateData)
    await doc.save()
    await petmidModel.deleteMany({ petId: updateData._id })
    const arr = shopIdArr.map(item => ({ shopId: item, petId: updateData._id }))
    await petmidModel.insertMany(arr)
    return { statu: true, msg: '更新成功' }
}
dao.del = async (_id) => {
    await petModel.deleteOne({ "_id": _id })
    await petmidModel.deleteMany({ petId: _id })
    return { statu: true, msg: '删除成功' }
}
module.exports = dao;