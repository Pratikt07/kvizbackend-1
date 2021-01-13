
const { getquestions } = require('./questionsGet')

module.exports.getQuestions = async (req, res) => {
   return await  getquestions(req,res);

}