const db = require('../models/index');
const fs = require("fs");
const root = require('../rootPath');




module.exports.insertQuiz = async ( req, res) => {

 try{
    let obj;
    const catId = await getCatId(req.body.cat_name);
        if(req.file==undefined){
            obj = fs.readFileSync(root + '/resources/static/assets/uploads/quizPic.jpg' );
          }       
        else{  
            obj = fs.readFileSync(req.file.path );         
        }
         const dbUpdate =  await db.quiz.update(
             { 
                quiz_catid : catId,
                created_at : Date.now(),
                description : req.body.description,
                overall_timer : req.body.overall_timer,
                quiz_present_date : Date.now(),
                quiz_thumbnail : obj ,
                quiz_pin : req.body.quiz_pin,
                quiz_status: false
            },
            {where : { quiz_id : req.body.quiz_id}
        })

            if(dbUpdate ){
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
        
        console.log(err);
        return res.status(501).json({
            status: false, 
            message : "Error occured",
            });
    }


};






async function getCatId(catname){
    try{
        const [cat, created] = await db.categories.findOrCreate({
            where: { Cat_name : catname}
            
        })
        console.log(created);
        return cat.Cat_id;
    }
    catch(err){
        console.log(err);
    }
}
