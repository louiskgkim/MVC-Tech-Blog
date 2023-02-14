const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const commentRoutes = require('./comment-routes.js');

// define path for api routes
router.use('/api', apiRoutes);

// define path for home routes
router.use('/', homeRoutes);

// define path for comment routes
router.use('/comment', commentRoutes);

module.exports = router;