const mongoose = require('mongoose');
const userSchema = mongoose.Schema({//骨架，结构
    username: String,   // 用户名
    pwd: String,        // 密码
    name: String,       // 真实姓名
    phone: String,      // 联系电话
    image: String       // 用户头像
}, { versionKey: false });
const userModel = mongoose.model('users', userSchema);//创建模型

module.exports = userModel;