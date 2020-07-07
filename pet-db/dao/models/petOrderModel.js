const mongoose = require('mongoose');
const petOrderSchema = mongoose.Schema({//骨架，结构
    petId: { type: mongoose.Schema.Types.ObjectId, ref: 'pets' }, // 宠物ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },   //用户 id
    addrId: { type: mongoose.Schema.Types.ObjectId, ref: 'addrs' },    //地址ID
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'shops' },     //门店Id
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' },   //管理员ID
    num: Number, //订单数量
    time: String, //下单时间
    status: String, //状态
}, { versionKey: false });
const petOrderModel = mongoose.model('petorders', petOrderSchema);//创建模型

module.exports = petOrderModel;