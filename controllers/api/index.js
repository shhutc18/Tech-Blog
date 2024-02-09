// Import the Router function from the 'express' package
const router = require('express').Router();

// Import the user routes from the 'user-routes' module
const userRoutes = require('./user-routes');

// Use the user routes for any requests that start with '/users'
router.use('/users', userRoutes);

// Export the configured router to be used in other parts of the application
module.exports = router;