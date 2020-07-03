const shopDao = require("../dao/shop");
const service = {};

service.createShop = async ({ name,address,telephone,desc,adminId }) => {
    const data = await shopDao.createShop({ name,address,telephone,desc,adminId });//null就是查无此人
    let status = true, msg = "insert success";
    if (!data) {
        status = false, msg = "insert failed", data = 0;
    }
    return { status, msg, data };
}
service.findShop = async ({limit,page})=>{
    const data =await shopDao.findShop({limit,page})
    return data;
}


module.exports = service;
