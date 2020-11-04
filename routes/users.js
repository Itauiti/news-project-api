const router = require('express').Router();

const { getUser, logoutUser } = require('../controllers/users');

router.get('/me', getUser);
router.post('/me/logout', logoutUser);

module.exports = router;
