const mongoose = require('mongoose');
const petCarSchema = mongoose.Schema({//骨架，结构
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'pets' }, // 宠物ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },   //用户 id
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'shops' },     //门店Id
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' },   //管理员ID
}, { versionKey: false });
const petCarModel = mongoose.model('petcars', petCarSchema);//创建模型

module.exports = petCarModel;