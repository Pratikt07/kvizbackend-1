
const { insertQuiz } = require('./quizAdd')

module.exports.addquiz = async (req, res) => {
    try{
        const data = await insertQuiz(req, res);
       console.log("data = "+data);
         
       
       
    }catch (err) {
        console.error(err);
    }
}