// Import necessary modules and files
const router = require('express').Router(); // Express router
const { Post, User, Comment } = require('../../models'); // Database models
const sequelize = require('../../config/connection'); // Database connection
const withAuth = require('../../utils/auth'); // Authentication middleware

// Route to get all posts
router.get('/', (req, res) => {
    // Find all posts with their associated comments and users
    Post.findAll({
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        order: [['created_at', 'DESC']], // Order by creation date in descending order
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
            },
        ]
    })
    .then(dbPostData => res.json(dbPostData)) // Send the post data as a response
    .catch(err => {
        console.log(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code with the error
    });
});

// Route to get a post by id
router.get('/:id', (req, res) => {
    // Find one post by id with its associated comments and users
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'created_at',
            'post_content'
        ],
        include: [
            {
                model: User,
                attributes: ['username', 'twitter', 'github']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username', 'twitter', 'github']
                }
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' }); // Send a 404 status code if no post is found
            return;
        }
        res.json(dbPostData); // Send the post data as a response
    })
    .catch(err => {
        console.log(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code with the error
    });
});

// Route to create a new post
router.post('/', withAuth, (req, res) => {
    // Create a new post with the provided data
    Post.create({
        title: req.body.title,
        post_content: req.body.post_content,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData)) // Send the post data as a response
    .catch(err => {
        console.log(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code with the error
    });
});

// Route to update a post
router.put('/:id', withAuth, (req, res) => {
    // Update the post with the provided data
    Post.update({
        title: req.body.title,
        post_content: req.body.post_content
    },
    {
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' }); // Send a 404 status code if no post is found
            return;
        }
        res.json(dbPostData); // Send the post data as a response
    })
    .catch(err => {
        console.log(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code with the error
    });
});

// Route to delete a post
router.delete('/:id', withAuth, (req, res) => {
    // Delete the post
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' }); // Send a 404 status code if no post is found
            return;
        }
        res.json(dbPostData); // Send the post data as a response
    })
    .catch(err => {
        console.log(err); // Log any errors
        res.status(500).json(err); // Send a 500 status code with the error
    });
});

// Export the router
module.exports = router;