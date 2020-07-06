
const petsModel = require("./models/petModel");
const dao = {};

dao.addpet = async (dates) => {
    const date = await petsModel.create(dates)
    return date
}
dao.getpet = async ({ page, limit }) => {
    const rows = await petsModel.find({}).skip((page - 1) * limit).limit(limit)
    const count = await petsModel.countDocuments()
    return { page, limit, rows, count }
}
dao.updatapet = async (datee) => {
    petsModel.deleteOne({ '_id': datee.datee._id }, function (err, docs) { });
    const date = await petsModel.create(datee.datee)
    return date
}
dao.deletpet = async (uers) => {
    const data = await petsModel.deleteOne({ "_id": uers }, function (err, doc) {
        if (err) { return }
        console.log(doc)
    })
    return data
}
module.exports = dao;