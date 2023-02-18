const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
  Post.findAll({
    attributes: [
      // Getting ID, Title, and timestamp from post table
      'id',
      'title',
      'created_at',
      'post_text',
    ],

    // ordering posts from most recent to least recent
    order: [['created_at', 'DESC']],
    include: [
      // from user table include the username of the creator
      {
        model: User,
        attributes: ['username']
      },
      // from the comment table, include all comments
      {
        model: Comment,
        attributes: [
          'id',
          'comment_text',
          'created_at',
          'post_id',
          'user_id',
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })

    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    // if server error, then return error
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// render single post page
router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post_text',
    ],
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: [
          'id',
          'comment_text',
          'created_at',
          'post_id',
          'user_id',
        ],
        include: {
          model: User,
          attributes: ['username']
        }
      }
    ]
  })
    .then(dbPostData => {
      // if no post by certain id exists, return an error
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id!' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      // pass the posts and session variable into the single post template
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      // if a server error, then return an error
      console.log(err);
      res.status(500).json(err);
    });
});

// Render login page and if the user is logged in, redirect to the homepage
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Render the sign up page and if the user is logged in, redirect to the homepage
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;