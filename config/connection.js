// Import the Sequelize constructor from the `sequelize` package
const Sequelize = require('sequelize');

// Import and configure dotenv to load environment variables
require('dotenv').config();

// Declare a variable to hold the Sequelize instance
let sequelize;

// Check if the application is running on JawsDB on Heroku
if (process.env.JAWSDB_URL) {
  // If so, initialize Sequelize to connect to the database using the Heroku database URL
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // If the app is running locally, initialize Sequelize to connect to a local MySQL database
  sequelize = new Sequelize(
    process.env.DB_NAME, // The name of the database
    process.env.DB_USER, // The user to connect as
    process.env.DB_PASSWORD, // The password for the user
    {
      host: 'localhost', // The host of the database
      dialect: 'mysql', // Connect to the database using the MySQL dialect
      port: 3001 // The port on which the database is running
    }
  );
}

// Export the Sequelize connection instance to be used in other parts of the application
module.exports = sequelize;