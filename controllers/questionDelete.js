
const db = require('../models/index')

module.exports.removeQuestion = async (req, res) =>{
    try{
        console.log(req.query.id);
        let Q = db.question.findOne({
            where: {
                question_id : req.query.id
            }
        });
        if(Q){
             const Qtag =  await db.question_tag.findOne({
                where: {
                    question_id: req.query.id
                }
            })
            
            await db.question.destroy({
                where: {
                   question_id : req.query.id
                }
            })
            await db.tags.destroy({
                where: {
                    tag_id : Qtag.tag_id
                }
            })
           
            return true;
        }
        else{
            return 0;
        }

    }
    catch(err){
  
        console.log(err);
        return false;
    }
}