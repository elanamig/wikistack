const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

router.get('/', (req, res, next) => {
  User.findAll()
  .then(data => {
      //console.log(data);
      res.render('users', {users: data})
  }).catch(next);
});

router.get('/:id', (req, res, next) => {
  Promise.all([
    User.findOne({
      where: {
        id: req.params.id
      }
    }),
    Page.findAll({
      where: {
        authorId: req.params.id
      }
    })
  ])
  .then(results => {
    var user = {
      name: results[0].name,
      email: results[0].email,
      pages: results[1]
    }

    res.render("singleuser", {user})
  }).catch(next)

});

router.post('/', (req, res) => {});

router.put('/:id', (req, res) => {});

router.delete('/:id', (req, res) => {});

module.exports = router;
