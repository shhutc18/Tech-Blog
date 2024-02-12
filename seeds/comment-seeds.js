// Import the Comment model from the models directory
const { Comment } = require('../models');

// Define an array of comment data
const commentData = [
  {
    // The first comment is made by the user with ID 6 on the post with ID 3 and says "This is a great resource, thanks for sharing!"
    user_id: 1,
    post_id: 2,
    comment_text: "This is a great resource, thanks for sharing!"
  },
  {
    // The second comment is made by the user with ID 7 on the post with ID 2 and says "I found this very helpful, thank you!"
    user_id: 2,
    post_id: 1,
    comment_text: "I found this very helpful, thank you!"
  },
  // More comments can be added as needed
];

// Define an asynchronous function that seeds the Comment table with the comment data
const seedComments = () => Comment.bulkCreate(commentData);

// Export the seedComments function
module.exports = seedComments;