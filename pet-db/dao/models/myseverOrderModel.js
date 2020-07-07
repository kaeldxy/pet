const mongoose = require('mongoose');
const myseverOrderSchema = mongoose.Schema({//骨架，结构
    myseverId: { type: mongoose.Schema.Types.ObjectId, ref: 'mysevers' }, // 服务ID
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },   //用户 id
    addrId: { type: mongoose.Schema.Types.ObjectId, ref: 'addrs' },    //地址ID
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'shops' },     //门店Id
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'admins' },   //管理员ID
    num: Number, //订单数量
    time: String,
    status: String, //状态
}, { versionKey: false });
const myseverOrderModel = mongoose.model('myseverorders', myseverOrderSchema);//创建模型

module.exports = myseverOrderModel;