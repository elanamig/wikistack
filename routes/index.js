const router = require('express').Router();
const user = require('./user');
const wiki = require('./wiki');

router.use('/wiki', wiki);
router.use('/user', user);

router.get('/', (req, res) => {
  res.end()
})

module.exports = router;
