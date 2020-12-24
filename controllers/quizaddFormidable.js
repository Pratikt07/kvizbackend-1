const db = require('../models/index')
var formidable = require('formidable');
const root = require('../rootPath')
const fs = require('fs');


module.exports.insertQuiz = (req, res) =>{

    try{
        
        var form = formidable.IncomingForm({multiples: true,keepExtensions:true,uploadDir: root+ '/uploads'});
       
        
  form.parse(req, async (err, fields, files) => {
    files.profile_pic.path = form.uploadDir + "/" + files.profile_pic.name;
    console.log("files = "+files);
    console.log("fields = "+fields);
    if (files.profile_pic.size>0) {

      var oldpath = files.profile_pic.path;
      var newpath = 'C:/Users/Your Name/' + files.profile_pic.name;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });

    }
        if (err) {
          next(err);
          return res.status(501).json({
            status: false, 
            message : "Error occured",
            });;
        }

        JSON.stringify({ fields, files });
        if(files.size()> 0){
          form.on('fileBegin', function(name, file) {
            
        })
        
        form.parse(req);
        }
        if( await isQuizExist(fields) ){
          console.log('User Exist');
         return  res.status(501).json({
            status: false, 
            message : "Quiz Already Exist",
            });
       }
       else{

          console.log("files = "+files);
          

        if(files==undefined){
            let path1 = form.uploadDir.toString() + '/quizPic.jpg';
            obj = fs.readFileSync(path1);
            
            
          }       
          else {
              console.log("file name = "+files[0].name);
              obj = fs.readFileSync(root , '/resources/static/assets/uploads/'+files[0].name );
              console.log( "obj not exist  = "+obj);
              
        }

        console.log("Adding Quiz");
          const dbInsert =  await db.quiz.create(
              { 
                  creator_id : fields.creator_id,
                  created_at : Date.now(),
                  title : fields.title,
                  description : fields.description,
                  overall_timer : null,
                  quiz_present_date : Date.now(),
                  quiz_thumbnail : obj ,
                  quiz_pin : fields.quiz_pin,
                  quiz_status: false
              })
              console.log(dbInsert);
              if(dbInsert){
                // fs.writeileSync(files[0].path ,files[0].);
                return res.status(201).json({
                  status: true, 
                  message : "Quiz Added Successfuly",
                  });;
              }
              else{
                return res.status(501).json({
                  status: false, 
                  message : "Quiz Added Failed",
                  });;
              }
}
        
}); 
    }catch(err){
        console.log(err);
    }


    const isQuizExist = async (fields) => {
      try{
          console.log("fields = " +fields);
          let data = await db.quiz.findOne({
              where: {
                  creator_id : fields.creator_id,
                  title : fields.title,
                  description : fields.description
  
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
}