const router = require('express').Router();
const user = require('./user');
const wiki = require('./wiki');

const models = require('../models');
const Page = models.Page;
const User = models.User;

router.use('/wiki', wiki);
router.use('/users', user);

router.get('/', (req, res) => {
  Page.findAll()
  .then(data => {
      //console.log(data);
      res.render('index', {data})
  })
})

module.exports = router;
