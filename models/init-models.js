var DataTypes = require("sequelize").DataTypes;
var _quiz = require("./quiz");
var _users = require("./users");
var _categories = require("./categories")

function initModels(sequelize) {
  var quiz = _quiz(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);
  quiz.belongsTo(users, { foreignKey: "creator_id"});
  users.hasMany(quiz, { foreignKey: "creator_id"});
  quiz.belongsTo(categories, { foreignKey: "quiz_catid"}); 
  categories.hasMany(quiz, { foreignKey: "quiz_catid"});

  return {
    quiz,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
