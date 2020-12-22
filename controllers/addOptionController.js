const { insertoption } = require('./optionAdd')

module.exports.insertOption = async (req, res) =>{
    try{
        let data =  await insertoption(req,res);
        if(data===false){
            res.status(501).json({
                status: false, 
                message : "Option Already Exist",
                });
        }else if(data===true){
            res.status(201).json({
                status: true, 
                message : "Option Added Successfuly",
                });
        }else{
            res.status(501).json({
                status: false, 
                message : "Option Added Failed",
                });
        }
    } catch (err) {
        console.error(err);
    }
} 