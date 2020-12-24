const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const quiz =  sequelize.define('quiz', {
    quiz_id: {
      autoIncrement: true,
      type: Sequelize.INTEGER,
      allowNull: false,
    primaryKey: true
    
    },
    creator_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      },
      // unique: "FK_quizCreator"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(70),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(250),
      allowNull: false
    },
    overall_timer: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    quiz_present_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    quiz_thumbnail: {
      type: DataTypes.BLOB('long'),
      allowNull: true
    },
    quiz_pin: {
      type: DataTypes.STRING(250),
      allowNull: true
    },
    quiz_status: {
      type: DataTypes.TINYINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'quiz',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "quiz_id" },
        ]
      },
      {
        name: "user_id",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
      {
        name: "creator_id",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
    ]
  });

  quiz.removeAttribute("id");
  return quiz;
};
