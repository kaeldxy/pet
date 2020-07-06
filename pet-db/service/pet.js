const petDao = require("../dao/pet");
const service = {};

service.servicepet = async (dates) => {
    const date = await petDao.addpet(dates);
    return date
}
service.servicegetpet = async ({ page, limit }) => {
    const date = await petDao.getpet({ page, limit });
    return date
}
service.servicupdatapet = async (datee) => {
    const date = await petDao.updatapet(datee);
    return date
}
service.servicdeletpet = async (uers) => {
    const date = await petDao.deletpet(uers);
    return date
}
module.exports = service