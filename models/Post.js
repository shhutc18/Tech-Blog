// Import the necessary modules from sequelize
const { Model, DataTypes } = require('sequelize');
// Import the configured sequelize instance
const sequelize = require('../config/connection');

// Define the Post class which extends the base Model class from sequelize
class Post extends Model {}

// Initialize the Post model
Post.init(
  {
    // Define the id field
    id: {
        type: DataTypes.INTEGER, // The type of this field is an integer
        primaryKey: true, // This field is the primary key
        autoIncrement: true // This field will auto increment
    },
    // Define the title field
    title: {
        type: DataTypes.STRING, // The type of this field is a string
    },
    // Define the post_content field
    post_content: {
        type: DataTypes.TEXT, // The type of this field is text
        allowNull: true // This field can be null
    },
    // Define the user_id field
    user_id: {
        type: DataTypes.INTEGER, // The type of this field is an integer
        references: {
          model: 'user', // This field references the 'user' model
          key: 'id' // The key in the 'user' model that this field references is 'id'
        }
    }
  },
  {
    sequelize, // Pass the sequelize instance to the model
    freezeTableName: true, // Prevent sequelize from renaming the table
    underscored: true, // Enable the use of underscores instead of camel-casing
    modelName: 'post' // Set the name of the model
  }
);

// Export the Post model
module.exports = Post;