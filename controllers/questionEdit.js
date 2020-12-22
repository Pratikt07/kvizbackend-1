const db = require('../models/index');

module.exports.editquestion = async (req, res) =>{
    try{
        
            console.log('cname = '+req.body.Cat_name)
            const catId = await getCatId(req.body.Cat_name);

            let Qid = await db.question.findByPk(req.body.question_id);
            
            console.log(Qid);
            if(Qid){
                Qid.quiz_id = req.body.quiz_id,
                Qid.Cat_id = catId,
                Qid.question_type = req.body.question_type,
                Qid.question_statement = req.body.question_statement,
                Qid.serial_no = req.body.serial_no,
                Qid.difficulty = req.body.difficulty,
                Qid.question_timer = req.body.question_timer,
                Qid.correct_option = req.body.correct_option,
                Qid.max_points = req.body.max_points,
                Qid.question_image = req.body.question_image
            }else{
                return false;
            }
            console.log("Editing Question");
            let save = await Qid.save();
           
                //console.log(save);
                if (save) { 
                    if(!insertTags(req.body.tags,req.body.question_id)){
                        return false;
                    }
                        //console.log(save);
                        return true;
                    }
                    else {
                        return false;
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
            where: { Cat_name : catname}
        })
        console.log("Cat id = "+cat.Cat_id);
        console.log("Cat name = "+cat.Cat_name);
        console.log("created "+created);
        return cat.Cat_id;
    }
    catch(err){
        console.log(err);
    }
}


async function insertTags(tags,Qid){
    try{
        let createTags;
        let saveTag;
        console.log("tags[0] = "+tags[0]);
        for(let i=0;i<tags.length;i++){
            console.log(tags[i]);
          let QtagId =  await db.question_tag.findOne({
                where: { 
                  question_id : Qid
                  } 
          });
          console.log(QtagId);
          if(QtagId){
                let tag =  await db.tags.findOne({
            
                    where: { tag_name: tags[i]}
                })
                if(tag){
                    tag.tag_name = tags[i];
                    saveTag = await tag.save();
                }
                else{
                    const [t, created] = await db.tags.findOrCreate({
                
                        where: { tag_name:tags[i]}
                    })
    
                   await db.question_tag.findOrCreate({
                        where: { 
                        tag_id:t.tag_id,
                        question_id : Qid
                        } 
                });
              }
                
            }
          
      
        
    }
        return true;

    }
    catch(err){
        console.log(err);
        return false;
    }
}

   async function isQuestionExist(statement,quizId){

    try {
        let data = await db.question.findOne({
            where: {
                quiz_id : quizId,
                question_statement : statement

            }
        });
        console.log("Exist or Not = "+data);
        if (data === null) return false;
        else return true;
    } catch {
        (err) => {
            res.status(500).send({
                message: 'Error adding question ',
            });
        };
    }
}