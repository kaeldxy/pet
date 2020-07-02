const mongoose = require('mongoose');
const goodmidSchema = mongoose.Schema({//骨架，结构
    shopId: {type: mongoose.Schema.Types.ObjectId, ref: 'shops'},
    goodId: {type: mongoose.Schema.Types.ObjectId, ref: 'goods'}
}, { versionKey: false });
const goodmidModel = mongoose.model('goodmids', goodmidSchema);//创建模型

module.exports = goodmidModel;