const { editquestion } = require('./questionEdit')

module.exports.editQuestion = async (req, res) =>{
    try{
        
        let data = await editquestion(req, res);
        console.log(data);
        if(data===false){
            res.status(501).json({
                status: false, 
                message : "Question Already Exist, Please Enter Different Question.",
                });
        }else if(data===true){
            res.status(201).json({
                status: true, 
                message : "Question Updated Successfuly",
                });
        }else{
            res.status(501).json({
                status: false, 
                message : "Question Updation Failed",
                });
        }
        
       
    }
    catch(err){
        res.status(501).json({
            status: false,
            message: "Failed To Edit Question"
        });
    }
}