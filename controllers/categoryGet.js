const db = require('../models/index');

module.exports.getCategory = async (req, res) => {
    const categries = await db.categories.findAll();
    if(categries){
        res.json({
            status : 'success',
            categories: categries
        });
    }else{
        res.json({
            status : 'error',
            message : "Empty Categoires"
        });
    }
}