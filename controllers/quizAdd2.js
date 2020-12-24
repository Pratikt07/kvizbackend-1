const db = require('../models/index');
const multer = require('multer')
const helpers = require('./helpers')
const storage = require('./storageImg')

module.exports.insertQuiz = async (req, res) => {
    
    // 'profile_pic' is the name of our file input field in the HTML form
    let  upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

    upload(req, res, async function(err) {
        try{
        // req.file contains information of uploaded file
        // req.body contains information of text fields, if there were any
        console.log(req.file.creator_id);
        let obj ,path1,path2 ;
        if( await isQuizExist(req) ){
            console.log('User Exist');
        
            return false;
         }
        if (req.fileValidationError) {
            return res.send(req.fileValidationError);
        }
        else if (!req.file) {
             obj = fs.readFileSync(root + '/resources/static/assets/uploads/quizPic.jpg' );

        }
        else if (err instanceof multer.MulterError) {
            return res.send(err);
        }
        else if (err) {
            return res.send(err);
        }else{
        path1 = path.join(root , '/resources/static/assets/uploads/'+req.files.profile_pic.name.toString());
        console.log( "path = "+path1);
        if(fs.existsSync(path1)){
            
            obj = path1;
            console.log("obj exist = "+obj);
          }else{
            let data = req.files.profile_pic.data;
              obj = fs.writeFileSync(path1,data );
              console.log( "obj not exist  = "+obj);
          }
        }
    console.log("obj = "+obj);
     const data = Buffer.from(obj, 'utf16le');
    //  const data = new Uint32Array(buf);
      console.log("data = "+data);
         console.log("Adding Quiz");
          await db.quiz.create(
             { 
                 creator_id : req.body.creator_id,
                 created_at : Date.now(),
                 title : req.body.title,
                description : req.body.description,
                overall_timer : null,
                quiz_present_date : Date.now(),
                quiz_thumbnail : data ,
                quiz_pin : req.body.quiz_pin,
                quiz_status: false
            }).then( (quiz) => {
              let path2 = path.join( root , "/resources/static/assets/tmp/" +  req.files.profile_pic.name.toString() );
            fs.writeFileSync(
              path2 , quiz.quiz_thumbnail,{flag:'w'});
              res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr /><a href="./">Upload another image</a>`);
            });
   
        // Display uploaded image for user validation
       
        }catch(err){
            console.log(err);
            throw err;
        }
    });


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
   
};