const mongoose = require('mongoose');
const petmidSchema = mongoose.Schema({//骨架，结构
    shopId: {type: mongoose.Schema.Types.ObjectId, ref: 'shops'}, // 门店id
    petId: {type: mongoose.Schema.Types.ObjectId, ref: 'pets'} // 宠物id
}, { versionKey: false });
const petmidModel = mongoose.model('petmids', petmidSchema);//创建模型

module.exports = petmidModel;