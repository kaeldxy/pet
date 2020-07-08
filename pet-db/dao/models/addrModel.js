const mongoose = require('mongoose');
const addrSchema = mongoose.Schema({//骨架，结构
    name: String,      // 收件人名称ref: 'admins'
    phone: String,     // 收件人联系电话
    address: String,    // 收件人地址
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' }   // 所属用户 id
}, { versionKey: false });
const addrModel = mongoose.model('addrs', addrSchema);//创建模型

module.exports = addrModel;