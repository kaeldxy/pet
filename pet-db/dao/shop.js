const shopModel = require("./models/shopModel");
const dao = {};

dao.findShop = async ({ page, limit, adminId }) => {
    let result = await shopModel.find({}).lean()
    page = ~~page;
    limit = ~~limit;
    if (adminId) {
        result = result.filter(item => item.adminId == adminId)
    }
    const rows = result.slice((page - 1) * limit, (limit * page))
    const count = result.length
    return { rows, count };
}

dao.createShop = async ({ name, address, telephone, desc, adminId }) => {
    const data = await shopModel.create({ name, address, telephone, desc, adminId });
    return data;
}

dao.updataShop = async ({ _id, name, address, telephone, desc, adminId }) => {
    const doc = await shopModel.findOne({ _id });
    Object.assign(doc, { name, address, telephone, desc, adminId })
    await doc.save()
    return { statu: true, msg: '修改成功' };
}



module.exports = dao;