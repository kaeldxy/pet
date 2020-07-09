var express = require("express");
const router = express.Router();
// const petmidModel = require('')
const allmidModel = {
    "petmidModel":require('../dao/models/petmidModel'),
    "goodmidModel":require('../dao/models/goodmidModel'),
    "mysevermidModel":require('../dao/models/mysevermidModel'),
}
const selectModel = type => allmidModel[Object.keys(allmidModel).find(item => new RegExp(type).test(item))]

router.get('/get', async (req, res, next) => {
    const {type, shopId} = req.query  
    console.log(type);
    
    const midmodel = selectModel(type)
    const data = await midmodel.find({shopId}).populate({
        path: `${type}Id`,
    })
    res.send({data})
})

module.exports = router