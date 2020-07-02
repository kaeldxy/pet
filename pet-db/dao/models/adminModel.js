const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({//骨架，结构
    account: String,   // 账号
    password: String,  // 密码
    name: String,      // 姓名
    age: String,       // 年龄
    gender: String,    // 性别
    phone: String,     // 手机号
    position: String,   // 职位（平台管理员/门店管理员） plat / shop
    status: String      // 状态（申请中/已通过/未通过） 暂时是 'pass'
}, { versionKey: false });
const adminModel = mongoose.model('admins', adminSchema);//创建模型

module.exports = adminModel;