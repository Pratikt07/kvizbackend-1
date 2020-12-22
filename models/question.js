const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
 const question =  sequelize.define('question', {
    question_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    quiz_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'quiz',
        key: 'quiz_id'
      }
    },
    Cat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'cat_id'
      }
    },
    question_type: {
      type: DataTypes.ENUM('MCQ','Fillup','Polling'),
      allowNull: false
    },
    question_statement: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    serial_no: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    difficulty: {
      type: Sequelize.ENUM('Easy','Medium','Hard'),
      allowNull: false
    },
    question_timer: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    correct_option: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    max_points: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    question_image: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'question',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "question_id" },
        ]
      },
      {
        name: "FK_quest_quiz",
        using: "BTREE",
        fields: [
          { name: "quiz_id" },
        ]
      },
      {
        name: "FK_quest_cat",
        using: "BTREE",
        fields: [
          { name: "Cat_id" },
        ]
      },
    ]
  });
  question.associate = (models) =>{
   
     //question.belongsTo(models.question_tag, { foreignKey:'question_id'});
     question.belongsToMany(models.tags,{through:models.question_tag});
  }
  return question;

};
