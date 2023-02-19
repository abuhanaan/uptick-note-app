const Sequelize = require('sequelize')
const sequelize = require("../db/connect")

const Note = sequelize.define('notes', {  
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    author: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

module.exports = Note;