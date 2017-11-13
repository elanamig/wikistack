const router = require('express').Router();
const user = require('./user');
const wiki = require('./wiki');


router.use('/wiki', wiki);
router.use('/user', user);

module.exports=router;