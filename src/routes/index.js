const router = require('express').Router();
const authRoutes = require('./auth');
const fileRoutes = require('./file');

router.use('/auth', authRoutes);
router.use('/file', fileRoutes);

// Health-check router
router.get('/health-check', (req, res) => {
    return res.send({ message: 'App is healthy' });
});

module.exports = router;