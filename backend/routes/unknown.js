const router = require('express').Router();
const getUnknownPath = require('../controllers/unknown.js');

router.get('/*', getUnknownPath);
router.post('/*', getUnknownPath);

module.exports = router;
