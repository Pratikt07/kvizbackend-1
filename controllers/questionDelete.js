
const db = require('../models/index')
const { sequelize } = require('../models/index');

module.exports.removeQuestion = async (req, res) =>{
    try{
        
        var quiz_id = req.body.quiz_id;
        var question_statement = req.body.question_statement;
        var question_id = req.body.question_id;
        var query = `call delete_question_details("${quiz_id}","${question_statement}","${question_id}")`
    
        let procedureCall =   await sequelize.query(query).then(v=>console.log(v));
        return true;
      
    }
    catch(err){
  
        console.log(err);
        return false;
    }
}