var models = require('./models');
var server = require('express')();
var routes = require ('./routes')
var nunjucks = require('nunjucks');

// templating boilerplate setup
server.engine('html', nunjucks.render); // how to render html templates
server.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off


server.use('/', routes);



models.db.sync({force: true})
.then(function () {
    // make sure to replace the name below with your express app
    server.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
