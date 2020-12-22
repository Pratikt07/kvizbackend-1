const db = require('../models/index');

module.exports.insertQuiz = (req, res) =>{

try{
    if( await isQuestionExist(req.body.question_statement,req.body.quiz_id) ){
        //console.log('User Exist');
        return false;
    }
    else{
        console.log('cname = '+req.body.Cat_name)
        const catId = await getCatId(req.body.Cat_name);

        console.log("Adding Question");
        let dbInsert = await db.question.create(
            { 
                quiz_id : req.body.quiz_id,
                Cat_id : catId,
                question_type : req.body.question_type,
                question_statement : req.body.question_statement,
                serial_no : req.body.serial_no,
                difficulty : req.body.difficulty,
                question_timer : req.body.question_timer,
                correct_option : req.body.correct_option,
                max_points : req.body.max_points,
                question_image : req.body.question_image
            }
               
        );
        let Q = await db.question.findOne({

            where:{
                question_statement : req.body.question_statement
            }
        })
        console.log(Q.question_id);
        if(dbInsert){
            if(!insertTags(req.body.tags,dbInsert.question_id)){
                return false;
            }
            
        }
        console.log(dbInsert);
        return true;
    }
}
catch (err) {
    console.log("===================Failed============================");
    console.log(err);
throw err;
}
}