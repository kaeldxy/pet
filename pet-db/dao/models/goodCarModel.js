const mongoose = require('mongoose');
const goodCarSchema = mongoose.Schema({//骨架，结构
    goodId: { type: mongoose.Schema.Types.ObjectId, ref: 'goods' }, // 宠物ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },   //用户 id
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'shops' },     //门店Id
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' },   //管理员ID
}, { versionKey: false });
const goodCarModel = mongoose.model('goodcars', goodCarSchema);//创建模型

module.exports = goodCarModel;