// Import the necessary modules from 'sequelize' and 'bcrypt'
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

// Import the configured sequelize instance from the 'connection' module
const sequelize = require('../config/connection');

// Define the User class, which extends the Sequelize Model class
class User extends Model {
  // Define a method 'checkPassword' to verify a given password against the user's stored password
  checkPassword(loginPw) {
    // Use bcrypt to compare the provided password with the stored password
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its schema and configuration
User.init(
  {
    // Define the schema for the User model
    id: {
      type: DataTypes.INTEGER, // The 'id' field is an integer
      allowNull: false, // 'id' must be provided
      primaryKey: true, // 'id' is the primary key
      autoIncrement: true, // 'id' will auto-increment
    },
    username: {
      type: DataTypes.STRING, // The 'username' field is a string
      allowNull: false, // 'username' must be provided
    },
    email: {
      type: DataTypes.STRING, // The 'email' field is a string
      allowNull: false, // 'email' must be provided
      unique: true, // 'email' must be unique
      validate: {
        isEmail: true, // 'email' must be a valid email address
      },
    },
    password: {
      type: DataTypes.STRING, // The 'password' field is a string
      allowNull: false, // 'password' must be provided
      validate: {
        len: [6], // 'password' must be at least 6 characters long
      },
    },
  },
  {
    // Define the configuration for the User model
    hooks: {
      // Define a 'beforeCreate' hook to hash the user's password before storing it in the database
      async beforeCreate(newUserData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
    },
    sequelize, // Pass the sequelize instance to the User model
    timestamps: false, // Do not automatically add timestamp fields (createdAt, updatedAt)
    freezeTableName: true, // Prevent sequelize from pluralizing the model name
    underscored: true, // Enable underscored mode for automatically generated fields
    modelName: 'user', // Set the model name to 'user'
  }
);

// Export the User model for use in other parts of the application
module.exports = User;