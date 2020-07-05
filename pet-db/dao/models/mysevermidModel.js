const mongoose = require('mongoose');
const mysevermidSchema = mongoose.Schema({//骨架，结构
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'shops' }, // 门店id
    myseverId: { type: mongoose.Schema.Types.ObjectId, ref: 'mysevers' } // 服务id
}, { versionKey: false });
const mysevermidModel = mongoose.model('mysevermids', mysevermidSchema);//创建模型

module.exports = mysevermidModel;