const db = require('../models/index');
const question = require('../models/question');
const tags = require('../models/tags');

module.exports.addquestion = async (req, res) =>{
    try{
        if( await isQuestionExist(req.body.question_statement,req.body.quiz_id) ){
            //console.log('User Exist');
            return false;
        }
        else{
            console.log('cname = '+req.body.cat_name)
            const catId = await getCatId(req.body.cat_name);

            console.log("Adding Question");
            let dbInsert = await db.question.create(
                { 
                    quiz_id : req.body.quiz_id,
                    cat_id : catId,
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


async function getCatId(catname){
    try{
        const [cat, created] = await db.categories.findOrCreate({
            where: { cat_name : catname}
            
        })
        console.log("Cat id = "+cat.cat_id);
        console.log("Cat name = "+cat.cat_name);
        console.log("created "+created);
        return cat.cat_id;
    }
    catch(err){
        console.log(err);
    }
}



async function insertTags(tags,Qid){
    try{
        let createTags;
        
        console.log("tags[0] = "+tags[0]);
        for(let i=0;i<tags.length;i++){
            console.log(tags[i]);
        const [t, created] = await db.tags.findOrCreate({
           
            where: { tag_name:tags[i]}
        })
        console.log("tag id = "+t.tag_id);
        console.log("tag name = "+t.tag_iname);
        console.log("created "+created);
        db.question_tag.findOrCreate({
              where: { 
                tag_id:t.tag_id,
                question_id : Qid
                } 
        });
    }
        return true;

    }
    catch(err){
        console.log(err);
        return false;
    }
}


// async function isTagPresent(tags,Qid){
//     let dbInsert = await db.tags.findAll({
//         raw:false,
//         include: [{
//           model: db.question_tag
           
        
//          }]
//       })
//       console.log(dbInsert);
// }

   async function isQuestionExist(statement,quizId){

    try {
        let data = await db.question.findOne({
            where: {
                quiz_id : quizId,
                question_statement : statement

            },
        });
        //console.log("Exist or Not = "+data);
        if (data == null) return false;
        else return true;
    } catch {
        (err) => {
            res.status(500).send({
                message: 'Error adding question ',
            });
        };
    }
}