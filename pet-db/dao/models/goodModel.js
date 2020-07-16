const mongoose = require('mongoose');
const goodSchema = mongoose.Schema({//骨架，结构
    name: String,        // 名称
    classify: String,    // 商品种类（主粮/零食/玩具/日常用品/药品...）
    pet: String,         // 适用宠物（全部/猫/狗/其他）
    price: Number,       // 价格
    weight: String,      // 重量
    production: String,  // 生产日期
    shelfLife: String,   // 保质期
    producer: String,    // 产地
    images: [String],       // 商品图片（列表图/详情图...）
    desc: String,        // 商品描述
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' },  // 所属门店管理员 id
}, { versionKey: false });
const goodModel = mongoose.model('goods', goodSchema);//创建模型

module.exports = goodModel;