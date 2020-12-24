const db = require('../models/index');
const fs = require("fs");
const root = require('../rootPath');
var path = require('path');




module.exports.insertQuiz = async ( req, res) => {

 try{
    let obj;
    console.log("file = "+req.file)
    console.log(req.body);
        if( await isQuizExist(req) ){
            console.log('User Exist');
            return  res.status(501).json({
                status: false, 
                message : "Quiz Already Exist",
                });
        }
        else{

            
         //console.log(req.body);

        if(req.file==undefined){
            obj = fs.readFileSync(root + '/resources/static/assets/uploads/quizPic.jpg' );
          
          }       
         else {
             console.log(req.file.path);
              obj = fs.readFileSync(req.file.path );
              console.log( "obj not exist  = "+obj);
              
       }
    }
  
         console.log("Adding Quiz");
         const dbInsert =  await db.quiz.create(
             { 
                 creator_id : req.body.creator_id,
                 created_at : Date.now(),
                 title : req.body.title,
                description : req.body.description,
                overall_timer : null,
                quiz_present_date : Date.now(),
                quiz_thumbnail : obj ,
                quiz_pin : req.body.quiz_pin,
                quiz_status: false
            })

            if(dbInsert ){
                return res.status(201).json({
                    status: true, 
                    message : "Quiz Added Successfuly",
                    });
            }
            else{
                return res.status(501).json({
                  status: false, 
                  message : "Quiz Added Failed",
                  });;
              }
            
            
    }

    catch (err) {
        console.log("===================Failed============================");
        console.log(err);
        return res.status(501).json({
            status: false, 
            message : "Error occured",
            });;
    }


};



const isQuizExist = async (req) => {
    try{
        console.log("files = " +req);
        let data = await db.quiz.findOne({
            where: {
                creator_id : req.body.creator_id,
                title : req.body.title,
                description : req.body.description

            },
        });
        console.log("Exist or Not = "+data);
        if (data == null) return false;
        else return true;
    }catch(e){
        console.log("===================Failed============================");
        throw e;
    }
}



