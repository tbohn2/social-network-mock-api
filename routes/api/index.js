const router = require('express').Router();
// Imports user and thought routes
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');

// Routes are found at ./api/user and .api/thought
router.use('/user', userRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;
