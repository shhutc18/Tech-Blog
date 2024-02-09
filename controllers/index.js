// Import the Router function from the 'express' package
const router = require('express').Router();

// Import the API routes from the 'api' module
const apiRoutes = require('./api');

// Import the home routes from the 'home-routes.js' module
const homeRoutes = require('./home-routes.js');

// Use the home routes for any requests that start with '/'
router.use('/', homeRoutes);

// Use the API routes for any requests that start with '/api'
router.use('/api', apiRoutes);

// Export the configured router to be used in other parts of the application
module.exports = router;