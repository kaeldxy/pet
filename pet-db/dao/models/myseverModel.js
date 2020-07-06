const mongoose = require('mongoose');
const myseverSchema = mongoose.Schema({//骨架，结构
    name: String,         // 名称
    classify: String,     // 服务种类（洗澡/游泳/修毛/驱虫...）
    pet: String,          // 适用宠物（全部/猫/狗/其他）
    price: String,        // 服务价格
    desc: String,         // 服务描述
    images: [String],
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' }, // 用户ID
}, { versionKey: false });
const myseverModel = mongoose.model('mysevers', myseverSchema);//创建模型

module.exports = myseverModel;