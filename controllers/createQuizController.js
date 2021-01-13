const  { createQ } = require('./quizCreate');

module.exports.createQuiz = async (req, res) => {
    try{
        const data = await createQ(req, res);
           console.log("data = "+data);
             
           
           
        }catch (err) {
            console.error(err);
        }
}
