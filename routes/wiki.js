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

router.get('/:urlTitle', (req, res, next) => {
    //build and execute query
    //select * from page where urlTitle='urlTitleParam'
    //res.json the retrieved page

    Page.findAll({
        where: {
            urlTitle: req.params.urlTitle
        }
    }).then (data => {
        //res.json(data);
        console.log(data);
        //console.log(Object.keys(data));
        //console.log(data.page.dataValues);
        res.render('wikipage', {page: data[0]});
    }).catch (next);

});

router.post('/', (req, res, next) => {

    var page = Page.build({
        title: req.body.title,
        content: req.body.content,
        status: req.body.status
    });

    page.save()
    .then(data => {
        res.redirect(data.route);
    }).catch (next);

});

module.exports = router;
