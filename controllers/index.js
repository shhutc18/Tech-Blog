// Import the 'express' module and create a new router
const router = require('express').Router();

// Import the API, home, and dashboard routes
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// Use the imported routes, associating each with a path
// '/api' for API routes, '/' for home routes, and '/dashboard' for dashboard routes
router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);

// Define a catch-all route that sends a 404 status when no other route is matched
router.use((req, res) => {
  res.status(404).end();
});

// Export the configured router to be used in other parts of the application
module.exports = router;