const shopModel = require("./models/shopModel");

const dao = {};

dao.findShop = async ({ page, limit, adminId }) => {
    let result;
    page = ~~page;
    limit = ~~limit;
    result = await shopModel.find({adminId}).skip((page - 1) * limit).limit(limit)
    const count = await shopModel.find({adminId}).countDocuments()
    return { rows: result, count };
}
dao.del = async ({ _id }) => {
    const { deletedCount } = await shopModel.deleteOne({ _id });
    return deletedCount === 1 ? ({ msg: '删除成功！' }) : ({ msg: '删除失败！' })
}

dao.createShop = async addData => {
    await shopModel.create(addData);
    return { statu: true, msg: "添加成功" };
}

dao.updataShop = async ({ _id, name, address, images, telephone, desc, adminId }) => {
    const doc = await shopModel.findOne({ _id });
    Object.assign(doc, { name, address, images, telephone, desc, adminId })
    await doc.save()
    return { statu: true, msg: '修改成功' };
}



module.exports = dao;