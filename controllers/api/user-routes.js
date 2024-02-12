// Import necessary modules
const router = require('express').Router(); // Express router
const { User, Post, Comment } = require('../../models'); // Database models
const withAuth = require('../../utils/auth'); // Authentication middleware

// Route to get all users
router.get('/', (req, res) => {
    // Find all users excluding their passwords
    User.findAll({
        attributes: { exclude: ['password'] }
    })
      .then(dbUserData => res.json(dbUserData)) // Send the user data as a response
      .catch(err => {
        console.log(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code with the error
      });
});

// Route to get a user by id
router.get('/:id', (req, res) => {
    // Find one user by id excluding their password
    User.findOne({
        attributes: { exclude: ['password']},
        where: {
          id: req.params.id
        },
        // Include the user's posts and comments
        include: [
            {
              model: Post,
              attributes: ['id', 'title', 'post_content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                  model: Post,
                  attributes: ['title']
                }
            }
        ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' }); // Send a 404 status code if no user is found
          return;
        }
        res.json(dbUserData); // Send the user data as a response
      })
      .catch(err => {
        console.log(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code with the error
      });
});

// Route to create a new user
router.post('/', (req, res) => {
    // Create a new user with the provided data
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      twitter: req.body.twitter,
      github: req.body.github
    })
    .then(dbUserData => {
      // Save the user's data in the session
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.twitter = dbUserData.twitter;
        req.session.github = dbUserData.github;
        req.session.loggedIn = true;
    
        res.json(dbUserData); // Send the user data as a response
      });
    });
});

// Route to log in a user
router.post('/login', (req, res) => {
    // Find a user by email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' }); // Send a 400 status code if no user is found
        return;
      }
  
      // Check if the provided password is correct
      const validPassword = dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' }); // Send a 400 status code if the password is incorrect
        return;
      }
  
      // Save the user's data in the session
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.twitter = dbUserData.twitter;
        req.session.github = dbUserData.github;
        req.session.loggedIn = true;
  
        res.json({ user: dbUserData, message: 'You are now logged in!' }); // Send the user data and a success message as a response
      });
    });
});

// Route to log out a user
router.post('/logout', (req, res) => {
    // If the user is logged in
    if (req.session.loggedIn) {
      // Destroy the session
      req.session.destroy(() => {
        res.status(204).end(); // Send a 204 status code as a response
      });
    }
    else {
      res.status(404).end(); // Send a 404 status code as a response
    }
});

// Route to update a user
router.put('/:id', withAuth, (req, res) => {
    // Update the user with the provided data
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' }); // Send a 404 status code if no user is found
          return;
        }
        res.json(dbUserData); // Send the user data as a response
      })
      .catch(err => {
        console.log(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code with the error
      });
});

// Route to delete a user
router.delete('/:id', withAuth, (req, res) => {
    // Delete the user
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' }); // Send a 404 status code if no user is found
          return;
        }
        res.json(dbUserData); // Send the user data as a response
      })
      .catch(err => {
        console.log(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code with the error
      });
});

// Export the router
module.exports = router;
