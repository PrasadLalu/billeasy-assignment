'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class file extends Model {

    static associate(models) {
      file.belongsTo(models.user, {
        foreignKey: 'user_id',
        as: 'user',
      })
    }
  }
  file.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    original_filename: DataTypes.STRING,
    storage_path: DataTypes.TEXT,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    extracted_data: DataTypes.TEXT,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'file',
  });
  return file;
};