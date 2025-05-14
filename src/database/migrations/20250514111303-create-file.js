'use strict';

const { FILE_STATUS } = require('../../utils/constants');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('files', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      original_filename: {
        type: Sequelize.STRING,
        allowNull: false
      },
      storage_path: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      extracted_data: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: null,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: FILE_STATUS.UPLOADED,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('files');
  }
};