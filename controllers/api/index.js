// Import the 'express' module and create a new router
const router = require('express').Router();

// Import the user, post, and comment routes
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

// Use the imported routes, associating each with a path
// '/users' for user routes, '/posts' for post routes, and '/comments' for comment routes
router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

// Export the configured router to be used in other parts of the application
module.exports = router;