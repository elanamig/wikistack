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
        (User.findOne({
            where: {
                id: data[0].authorId
            }
        }))
        .then(userData => {
            var singlePage = {
                page: data[0],
                name: userData.name,
                email: userData.email
            }
            res.render('wikipage', {
                singlePage
            });
        })

    }).catch (next);

});

router.post('/', (req, res, next) => {
    console.log(req.body.email)
    var user = User.findOrCreate({
        where: {
            name: req.body.aName,
            email: req.body.aEmail
        }
    })
    .spread((userResult, userCreated)=> {
        //console.log( "userResult", userResult)
       // console.log( "userCreated", userCreated)

        var page = Page.build({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status
        });

        return page.save()
        .then(data => {
            return page.setAuthor(userResult)
        })
    })

    .then(data => {
        res.redirect(data.route);
    }).catch (next);




});

module.exports = router;
