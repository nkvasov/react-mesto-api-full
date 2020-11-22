const router = require('express').Router();
const {
  getUsers,
  getUser,
  getUserInfo,
  updateAvatar,
  updateProfile,
} = require('../controllers/users.js');

router.get('/users', getUsers);

router.get('/users/me', getUserInfo);

router.get('/users/:userId', getUser);

router.patch('/users/me', updateProfile);

router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
