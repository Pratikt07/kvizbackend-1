const {removeQuestion} = require('./questionDelete')

module.exports.deleteQuestion = async (req, res) => {
    try{
        const data = await removeQuestion(req, res);
        console.log("data = "+data);
        if(data===false){
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