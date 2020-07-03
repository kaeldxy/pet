const shopModel = require("./models/shopModel");
const dao = {};

dao.findShop = async ({ page, limit }) => {
    const rows = await shopModel.find().skip((page - 1) * limit).limit(limit);
    const count = await shopModel.countDocuments();
    const maxPage = Math.ceil(count / limit);
    return { rows, count, maxPage };
}


dao.createShop = async ({ name,address,telephone,desc,adminId }) => {
    // const xx = await adminIdMocel.find().populate('adminId', ['name'])
    const data = await shopModel.create({ name,address,telephone,desc,adminId });
    return data;
}




module.exports = dao;