const db = require('../models/index');
const fs = require("fs");


module.exports.editQuestion1 = async (req,res) => {
    try{
        if(await isQuestionExist( req.body.question_statement,req.body.quiz_id)){
            console.log('false');
            return false;
        }
        let tagsCheck = {};
        let optionsCheck = {};
    var cat_name = req.body.cat_name;
    var tags = "";
    var optionsList = "";
    var quiz_id = req.body.quiz_id;
    var question_statement = req.body.question_statement;
    var question_type = req.body.question_type;
    var serial_no = req.body.serial_no;
    var difficulty = req.body.difficulty;
    var question_timer = req.body.question_timer;
    var max_points = req.body.max_points;
    var option_state = req.body.option_state;
    var correct_serial = req.body.correct_serial;
    let question_Image_Buffer;
    var tagList = req.body.tags;
    
    await isTagsPresent(tagList)
    for(var i=0;i<tagList.length;i++){
        console.log("true or false tags = "+tagsCheck[tagList[i]]);
        if(tagsCheck[tagList[i]]){
            continue;
        }else{
            if(i==tagList.length-1){
                tags +=  "( '"+ tagList[i]+"' )";
            }else{
                tags +=  "( '"+ tagList[i]+"' ),";
            }
        }      
    }

    if(await iscategoryExist(cat_name)){
        cat_name = null;
    }

    await isOptionsPresent(option_state);
    for(var i=0;i<option_state.length;i++){
        if(optionsCheck[option_state[i].stmt]){
            continue;
        }else{
            if(i==option_state.length-1){
                optionsList +=  "( q_id ,'"+ option_state[i].stmt+"',"+ option_state[i].srno+" )";
            }else{
                optionsList +=  "( q_id ,'"+ option_state[i].stmt+"',"+ option_state[i].srno+" ),";
            }
        }
        
    }

    console.log(optionsList);
   
    if(req.file==undefined){
        question_Image_Buffer = null;
      
      }       
     else {
         console.log(req.file.path);
         question_Image_Buffer = fs.readFileSync(req.file.path);
          console.log( "obj not exist  = "+obj);
          
   }

   
   if(tagList === ""){
    tagList = null;
   }
   if(optionsList === ""){
    optionsList = null;
   }
   console.log("adding.....................")
    var query = `call insert_question_details (:catName,"${tags}",:quiz_id,:question_type,:question_statement,:serial_no,:difficulty,:question_timer,:max_points,:question_image,"${optionsList}",:correct_serial )`
    
    let procedureCall =   await db.sequelize.query(query, {
        
        replacements: {
            catName: cat_name,
            quiz_id: quiz_id ,
            question_type: question_type,
            question_statement:question_statement,
            serial_no: serial_no,
            difficulty:difficulty,
            question_timer: question_timer,
            max_points: max_points,
            question_image: question_Image_Buffer,
            correct_serial: correct_serial
        
        }
    }).then(v=>console.log(v));

    let Q = await db.question.findOne({

        where:{
            question_statement : question_statement
        }
    })
    mergeQuestionTags(req.body.tags,Q.question_id);

    return true;  
    }
    catch(err) {
        console.log("===========================error===================================");
        console.error(err);
        return 0;
    }
}

async function isOptionsPresent(option_state){
    try{
        for(let i=0;i<option_state.length;i++){
            console.log(option_state[i]);
        const [option, created] = await db.options.findOne({
           
            where: { option_statement:option_state[i].stmt}
        })
        console.log("created "+created);
        if(created){
            optionsCheck[option_state[i].stmt] = true;
        }else{
            optionsCheck[option_state[i].stmt] = false;
        }
    }
        return ;

    }
    catch(err){
        console.log(err);
       
    }
}
async function iscategoryExist(cat_name){
    try {
        let data = await db.categories.findOne({
            where: {
                Cat_name : cat_name
            },
        });
        
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

async function isTagsPresent(tagList){
    try{
        for(let i=0;i<tagList.length;i++){
            console.log(tagList[i]);
        const [t, created] = await db.tags.findOne({
           
            where: { tag_name:tagList[i]}
        });
        
        console.log("created "+created);
        if(created){
            tagsCheck[tagList[i]] = true;
        }else{
            tagsCheck[tagList[i]] = false;
        }
        db.question_tag.findOrCreate({
              where: { 
                tag_id:t.tag_id,
                question_id : Qid
                } 
        });
    }
        return ;

    }
    catch(err){
        console.log(err);
       
    }
}

async function isQuestionExist(statement,quizId){
    try {
        let data = await db.question.findOne({
            where: {
                quiz_id : quizId,
                question_statement : statement

            },
        });
        console.log("question exist = "+data);
        if (data == null) return false;
        else return true;
    } catch {
        (err) => {
           console.error(err);
        };
    }
}

async function mergeQuestionTags(tags,Qid){
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
        
    }
}