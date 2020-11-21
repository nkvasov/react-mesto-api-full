const router = require('express').Router();
const {
  getUsers,
  getUser,
  // createUser,
  updateAvatar,
  updateProfile,
} = require('../controllers/users.js');

router.get('/users', getUsers);

router.get('/users/:userId', getUser);

// router.post('/users', createUser);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
