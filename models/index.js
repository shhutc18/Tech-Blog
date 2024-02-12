// Import the User, Post, and Comment models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define the relationship between the User and Post models
// A User can have many Posts
User.hasMany(Post, {
    foreignKey: 'user_id' // The foreign key in the Post model is 'user_id'
});

// Define the relationship between the Post and User models
// A Post belongs to a User
Post.belongsTo(User, {
    foreignKey: 'user_id', // The foreign key in the Post model is 'user_id'
});

// Define the relationship between the Comment and User models
// A Comment belongs to a User
Comment.belongsTo(User, {
    foreignKey: 'user_id' // The foreign key in the Comment model is 'user_id'
});

// Define the relationship between the Comment and Post models
// A Comment belongs to a Post
Comment.belongsTo(Post, {
    foreignKey: 'post_id' // The foreign key in the Comment model is 'post_id'
});

// Define the relationship between the User and Comment models
// A User can have many Comments
User.hasMany(Comment, {
    foreignKey: 'user_id' // The foreign key in the Comment model is 'user_id'
});

// Define the relationship between the Post and Comment models
// A Post can have many Comments
Post.hasMany(Comment, {
    foreignKey: 'post_id' // The foreign key in the Comment model is 'post_id'
});

// Export the User, Post, and Comment models
module.exports = {User, Post, Comment};