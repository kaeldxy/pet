const mongoose = require('mongoose');
const shopSchema = mongoose.Schema({//骨架，结构
    name: String,       // 名称
    address: String,    // 地址
    telephone: String,  // 电话
    desc: String,       // 门店描述
    adminId:String
    // adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' }   // 所属门店管理员 id
}, { versionKey: false });
const shopModel = mongoose.model('shops', shopSchema);//创建模型

module.exports = shopModel;