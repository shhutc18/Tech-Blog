// Import the necessary modules from 'sequelize'
const { Model, DataTypes } = require('sequelize');

// Import the configured sequelize instance from the 'connection' module
const sequelize = require('../config/connection');

// Define the Post class, which extends the Sequelize Model class
class Post extends Model { }

// Initialize the Post model with its schema and configuration
Post.init(
  {
    // Define the schema for the Post model
    id: {
      type: DataTypes.INTEGER, // The 'id' field is an integer
      allowNull: false, // 'id' must be provided
      primaryKey: true, // 'id' is the primary key
      autoIncrement: true, // 'id' will auto-increment
    },
    title: {
      type: DataTypes.STRING, // The 'title' field is a string
      allowNull: false, // 'title' must be provided
    },
    date: {
      type: DataTypes.DATE, // The 'date' field is a date
      allowNull: false, // 'date' must be provided
    },
    post_text: {
      type: DataTypes.STRING, // The 'post_text' field is a string
      allowNull: false, // 'post_text' must be provided
    },
    user_id: {
      type: DataTypes.INTEGER, // The 'user_id' field is an integer
      // 'user_id' references the 'id' field in the 'user' model
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize, // Pass the sequelize instance to the Post model
    timestamps: false, // Do not automatically add timestamp fields (createdAt, updatedAt)
    freezeTableName: true, // Prevent sequelize from pluralizing the model name
    underscored: true, // Enable underscored mode for automatically generated fields
    modelName: 'user', // Set the model name to 'user'
  }
);

// Export the Post model for use in other parts of the application
module.exports = Post;