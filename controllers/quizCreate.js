const db = require('../models/index');
const fs = require("fs");
const root = require('../rootPath');
var path = require('path');




module.exports.createQ= async ( req, res) => {

 try{
    let obj;
    const catId = await getCatId(req.body.quiz_catname);
        if( await isQuizExist(req) ){
            return  res.status(501).json({
                status: false, 
                message : "Quiz Already Exist",
                });
        }
        else{
            if(req.file==undefined){
                obj = null;
            
            }       
            else {
                console.log(req.file.path);
                obj = fs.readFileSync(req.file.path );
                console.log( "obj not exist  = "+obj);
                
            }
        }
         const dbInsert =  await db.quiz.create(
             { 
                quiz_catid : catId,
                 creator_id : req.body.creator_id,
                 created_at : Date.now(),
                 title : req.body.title,
                description : req.body.description,
                quiz_thumbnail : obj ,
            })

            if(dbInsert ){
                return res.status(201).json({
                    status: true, 
                    message : "Quiz Created Successfuly",
                    });
            }
            else{
                return res.status(501).json({
                  status: false, 
                  message : "Quiz Created Failed",
                  });;
              }        
    }
    catch (err) {
        console.log("===================Failed============================");
        console.log(err);
        return res.status(501).json({
            status: false, 
            message : "Error occured",
            });
    }
};



const isQuizExist = async (req) => {
    try{
        let data = await db.quiz.findOne({
            where: {
                creator_id : req.body.creator_id,
                title : req.body.title,

            },
        });
        if (data == null) return false;
        else return true;
    }catch(e){
        console.log("===================Failed============================");
        throw e;
    }
}

async function getCatId(catname){
    try{
        const [cat, created] = await db.categories.findOrCreate({
            where: { Cat_name : catname}
            
        })
        console.log("created "+created);
        return cat.Cat_id;
    }
    catch(err){
        console.log(err);
    }
}


