// Import necessary modules
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Route for getting all Posts and rendering them to the homepage
router.get('/', (req, res) => {
    console.log(req.session);
    
    // Find all Posts in the database
    Post.findAll({
      // Specify the data to be retrieved
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
      ],
      // Include related data from the Comment and User models
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'twitter', 'github']
          }
        },
        {
          model: User,
          attributes: ['username', 'twitter', 'github']
        }
      ]
    })
      .then(dbPostData => {
        // Convert the data to plain JavaScript objects for rendering
        const posts = dbPostData.map(post => post.get({ plain: true }));
        // Render the data to the homepage
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Route for rendering the login page
router.get('/login', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    // Render the login page
    res.render('login');
});

// Route for rendering the signup page
router.get('/signup', (req, res) => {
    // If the user is already logged in, redirect to the homepage
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    // Render the signup page
    res.render('signup');
});

// Route for getting a single Post by id and rendering it to the single-post page
router.get('/post/:id', (req, res) => {
    // Find a single Post by id
    Post.findOne({
      where: {
        id: req.params.id
      },
      // Specify the data to be retrieved
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
      ],
      // Include related data from the Comment and User models
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'twitter', 'github']
          }
        },
        {
          model: User,
          attributes: ['username', 'twitter', 'github']
        }
      ]
    })
      .then(dbPostData => {
        // If no Post is found, return an error
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        // Convert the data to a plain JavaScript object for rendering
        const post = dbPostData.get({ plain: true });
  
        // Render the data to the single-post page
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Export the router to be used in other parts of the application
module.exports = router;