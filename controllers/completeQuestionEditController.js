const { editQuestion1 } = require('./completeQuestionAdd')

module.exports.editQuestion = async (req, res) =>{
    try{
        console.log("in contoller");
        let data = await editQuestion1(req, res);
        console.log("in controller "+data);
        if(data===false){
            res.status(501).json({
                status: false, 
                message : "Question Already Exist",
                });
        }else if(data===true){
            res.status(201).json({
                status: true, 
                message : "Question Added Successfuly",
                });
        }else{
            res.status(501).json({
                status: false, 
                message : "Question Added Failed",
                });
        }
        
       
    }
    catch(err){
        res.status(501).json({
            status: false,
            message: "Failed To Add Question"
        });
    }
}