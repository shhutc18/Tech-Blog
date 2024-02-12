// Import the necessary modules from sequelize
const { Model, DataTypes } = require('sequelize');
// Import the configured sequelize instance
const sequelize = require('../config/connection');

// Define the Comment class which extends the base Model class from sequelize
class Comment extends Model {}

// Initialize the Comment model
Comment.init(
  {
    // Define the id field
    id: {
        type: DataTypes.INTEGER, // The type of this field is an integer
        primaryKey: true, // This field is the primary key
        autoIncrement: true // This field will auto increment
    },
    // Define the user_id field
    user_id: {
        type: DataTypes.INTEGER, // The type of this field is an integer
        references: {
          model: 'user', // This field references the 'user' model
          key: 'id' // The key in the 'user' model that this field references is 'id'
        }
    },
    // Define the post_id field
    post_id: {
        type: DataTypes.INTEGER, // The type of this field is an integer
        references: {
          model: 'post', // This field references the 'post' model
          key: 'id' // The key in the 'post' model that this field references is 'id'
        }
    },
    // Define the comment_text field
    comment_text: {
        type: DataTypes.STRING, // The type of this field is a string
        validate: {
            len: [1] // This field must be at least 1 character long
        }
    }
  },
  {
    sequelize, // Pass the sequelize instance to the model
    freezeTableName: true, // Prevent sequelize from renaming the table
    underscored: true, // Enable the use of underscores instead of camel-casing
    modelName: 'comment' // Set the name of the model
  }
);

// Export the Comment model
module.exports = Comment;