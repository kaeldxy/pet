const mongoose = require('mongoose');
const petSchema = mongoose.Schema({//骨架，结构
    name: String,        // 名称
    classify: String,    // 宠物品种
    price: String,       // 价格
    weight: String,      // 重量
    age: String,         // 年龄
    images: [String],    // 宠物图片
    desc: String,        // 宠物描述
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' }, // 用户ID
}, { versionKey: false });
const petModel = mongoose.model('pets', petSchema);//创建模型

module.exports = petModel;