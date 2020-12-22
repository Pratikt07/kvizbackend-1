const db = require('../models/index')

module.exports.insertoption = async (req, res) => {
    try{
        if( await isOptionExist(req.query.option_statement,req.query.question_id) ){
            console.log('Option Exist');
            return false;
        }
        else{
            const option ={
                question_id : req.query.question_id,
                option_statement: req.query.option_statement,
                serial_no: req.query.serial_no
            }

            let dbInsert = await db.options.create(option);
            return true;
        }
    }catch(err){
        console.log("===================Failed============================");
        console.log(err);
        throw err;
    }

}

async function isOptionExist(statement,id){

    try {
        console.log("statement = "+statement);
        console.log("id = "+id);
        let data = await db.options.findOne({
            where: {
               question_id : id,
                option_statement : statement

            },
        });
        console.log("Exist or Not = "+data);
        if (data == null) return false;
        else return true;
    } catch {
        (err) => {
            res.status(500).send({
                message: 'Error adding Option ',
            });
        };
    }
}