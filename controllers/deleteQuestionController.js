const {removeQuestion} = require('./questionDelete')

module.exports.deleteQuestion = (req, res) =>{
    try{
        const data = removeQuestion(req, res);
        if(data===0){
            res.json({
                success : false,
                msg:'Question doesn\'t exist'
            })
        }
        else if(data === true){
            res.json({
                success : true,
                msg:'Question Delete Successfuly'
            })
        }
        else{
            res.json({
                success : false,
                msg:'Question Deletion Failed'
            })
        }
    }
    catch(err){
        console.log(err);
    }

}