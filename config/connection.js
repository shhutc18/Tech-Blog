// Import the Sequelize constructor from the sequelize package
const Sequelize = require('sequelize');

// Import dotenv package to read and set any environment variables
require('dotenv').config();

// Declare a variable to hold our Sequelize instance
let sequelize;

// If the application is running on Heroku and it has a JAWSDB_URL environment variable (which is automatically set by the JAWSDB add-on), use that as the connection URL
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Otherwise, connect to the MySQL database specified by the DB_NAME, DB_USER, and DB_PW environment variables
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost', // The host of the database. This is typically 'localhost' when the database is running on the same machine as this application
    dialect: 'mysql', // The type of SQL database. In this case, it's MySQL
    port: 3306 // The port number on which the database server is listening
  });
}

// Export the sequelize object so it can be used in other parts of the application
module.exports = sequelize;