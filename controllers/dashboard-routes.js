const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

router.get('./', withAuth, (req, res) => {
  // all users posts to be obtained from the db
  Post.findAll({
    where: {
      // use id from session
      user_id: req.session.user_id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post_text',
    ],
    include: [
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
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      // if a server error, then return an error
      console.log(err);
      res.status(500).json(err);
    });
});

// route to edit a certain post by id
router.get('/edit/:id', withAuth, (req, res) => {
  // all posts obtained from db
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
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        // return error if not post with the id
        res.status(404).json({ message: "No post found with this id! " });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
      // if a server error, then return an error
      console.log(err);
      res.status(500).json(err);
    });
});

// route to edit logged in user
router.get('/edituser', withAuth, (req, res) => {
  // access user model to get single user based on parameters
  User.findOne({
    attributes: { exclude: ['password'] },
    where: {
      id: req.session, user_id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        // if no user found, return 404 error
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      // otherwise, return data for requested user
      const user = dbUserData.get({ plain: true });
      res.render('edit-user', { user, loggedIn: true });
    })
    .catch(err => {
      // if a server error, then return an error
      console.log(err);
      res.status(500).json(err);
    })
});

module.exports = router;