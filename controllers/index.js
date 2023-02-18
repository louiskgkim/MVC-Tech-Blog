const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

// define path for api routes
router.use('/api', apiRoutes);

// define path for home routes
router.use('/', homeRoutes);

// define path for dashboard routes
router.use('/dashboard', dashboardRoutes);

// catch-all route for any resource that does not exist
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;