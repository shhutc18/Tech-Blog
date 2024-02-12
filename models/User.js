// Import the necessary modules from sequelize
const { Model, DataTypes } = require('sequelize');
// Import the configured sequelize instance
const sequelize = require('../config/connection');
// Import the bcrypt module for password hashing
const bcrypt = require('bcrypt');

// Define the User class which extends the base Model class from sequelize
class User extends Model {
    // Define a method to check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Initialize the User model
User.init(
    {
        // Define the id field
        id: {
          type: DataTypes.INTEGER, // The type of this field is an integer
          primaryKey: true, // This field is the primary key
          autoIncrement: true // This field will auto increment
        },
        // Define the username field
        username: {
          type: DataTypes.STRING, // The type of this field is a string
        },
        // Define the twitter field
        twitter: {
            type: DataTypes.STRING, // The type of this field is a string
            allowNull: true // This field can be null
        },
        // Define the github field
        github: {
            type: DataTypes.STRING, // The type of this field is a string
            allowNull: true // This field can be null
        },
        // Define the email field
        email: {
          type: DataTypes.STRING, // The type of this field is a string
          unique: true, // This field must be unique
          validate: {
            isEmail: true // This field must be a valid email
          }
        },
        // Define the password field
        password: {
          type: DataTypes.STRING, // The type of this field is a string
          validate: {
            len: [4] // This field must be at least 4 characters long
          }
        }
      },
  {
      // Define hooks for the User model
      hooks: {
        // This hook will run before a new user is created
        async beforeCreate(newUserData) {
            // Hash the password of the new user
            newUserData.password = await bcrypt.hash(newUserData.password, 10);
            return newUserData;
        },
        // This hook will run before an existing user is updated
        async beforeUpdate(updatedUserData) {
            // Hash the updated password of the user
            updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
            return updatedUserData;
        }
      },

    sequelize, // Pass the sequelize instance to the model
    timestamps: false, // Disable timestamps for this model
    freezeTableName: true, // Prevent sequelize from renaming the table
    underscored: true, // Enable the use of underscores instead of camel-casing
    modelName: 'user' // Set the name of the model
  }
);

// Export the User model
module.exports = User;