const { addquestion } = require('./questionAdd')

module.exports.addQuestion = async (req, res) =>{
    try{
        
        let data = await addquestion(req, res);
        console.log(data);
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