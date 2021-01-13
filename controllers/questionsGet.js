const db = require('../models/index');

module.exports.getquestions = async (req, res) => {
   const result  = {};
    const questions = await db.question.findAll();
    console.log(JSON.stringify(questions));
    const questionList = JSON.parse(JSON.stringify(questions));
    console.log(questionList[0]);
    if(questionList){
        for(let i=0; i<questionList.length; i++){
            let data = {};
            data["question"] = questionList[i];
            const options = await db.options.findAll({
                where : {question_id : questionList[i].question_id}
            });
            let optionsList = JSON.parse(JSON.stringify(options));
            data["options"] = optionsList;
            const category = await db.categories.findOne({
                where : {Cat_id : questionList[i].Cat_id}
            });
            data["category"] = category.Cat_name;

            const tagIds = await db.question_tag.findAll({attributes:["tag_id"], where : {question_id : questionList[i].question_id}});
            const tags = {};
            for (x in tagIds){
             
                const tag = await db.tags.findOne({attributes:["tag_name"],where : {tag_id: tagIds[x]}});
                tags["tag_name"] = tag;
            }
            tags1 = JSON.parse(JSON.stringify(tags));
            data["tags"] = tags1;
            result[questionList[i].question_id] = data; 
        }
        res.json(result);
    }else{
        res.json({
            status : 'error',
            message : "Empty Categoires"
        });
    }
}