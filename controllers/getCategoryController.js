const { getCategory } = require('./categoryGet')

module.exports.getCategory = async (req, res) => {
   return await getCategory(req,res);

}