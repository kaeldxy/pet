const mongoose = require('mongoose');
const myseveCarSchema = mongoose.Schema({//骨架，结构
    myseverId: { type: mongoose.Schema.Types.ObjectId, ref: 'mysevers' }, // 宠物ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },   //用户 id
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'shops' },     //门店Id
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' },   //管理员ID
}, { versionKey: false });
const myseveCarModel = mongoose.model('mysevecars', myseveCarSchema);//创建模型

module.exports = myseveCarModel;