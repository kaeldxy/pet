
const petCarModel = require('./models/petCarModel.js');
const myseverCarModel = require('./models/myseverCarModel.js');
const goodCarModel = require('./models/goodCarModel.js');

const allModel = {
    petCarModel,
    myseverCarModel,
    goodCarModel
}




module.exports = {
    get: async ({ userId }) => {
        const data = []
        for (const key in allModel) {
            let itemData = await allModel[key].find({ userId }).populate({ path: `${key.replace(/CarModel/, '')}Id` }).lean()
            data.push(...itemData)
        }
        return { cars: data }
    },
    add: async addData => {
        let doc
        if(addData.petId){
            doc = await petCarModel.create(addData)
            return await petCarModel.findOne({_id: doc._id}).populate({path: 'petId'})
        }else if(addData.goodId){
            doc = await goodCarModel.create(addData)
            return await goodCarModel.findOne({_id: doc._id}).populate({path: 'goodId'})
        }else{
            doc = await myseverCarModel.create(addData)
            return await myseverCarModel.findOne({_id: doc._id}).populate({path: 'myseverId'})
        }
    },

    clear: async ({userId}) => {
        for (const key in allModel) {
            await allModel[key].deleteMany({userId})
        }
        return { statu: true, msg: '清空成功' }
    },
    del: async ({type, _id}) => {
        await allModel[`${type}CarModel`].deleteOne({ _id })
        return { statu: true, msg: '删除成功' }
    },
}