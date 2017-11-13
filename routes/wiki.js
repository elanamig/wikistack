const router = require('express').Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;

// const urlFunc = (title) => {
//   return title ?
//     title.replace(/ /g,"_").replace(/[^a-z0-9+]+/gi, '')
//   : Math.random().toString(36).substring(2, 7);
// }

router.get('/', (req, res) => {
    res.redirect('/')
});

router.get('/add', (req, res) => {

    res.render('addpage');
});

router.post('/', (req, res) => {

    var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
    });

    page.save()
    .then(data => {
        res.render('wikipage')
    })

});

module.exports = router;
