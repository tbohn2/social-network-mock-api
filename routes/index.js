const router = require('express').Router();
const apiRoutes = require('./api');

// Specifies location of routes to use
router.use('/api', apiRoutes);

module.exports = router;
