// Import the configured sequelize instance from the 'connection' module
const sequelize = require('../config/connection');

// Import the User model from the 'models' module
const { User } = require('../models');

// Import the user data from the 'userData.json' file
const userData = require('./userData.json');

// Define an asynchronous function 'seedDatabase' to seed the database
const seedDatabase = async () => {
  // Sync the models with the database, dropping all tables and recreating them
  await sequelize.sync({ force: true });

  // Bulk create User instances in the database from the imported user data
  // The 'individualHooks' option ensures that any hooks defined on the User model are run for each record
  // The 'returning' option ensures that the created records are returned
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Exit the process to end the script
  process.exit(0);
};

// Call the 'seedDatabase' function to seed the database
seedDatabase();