var models = require('./models');
var express = require('express')
var server = express();
var routes = require('./routes')
var nunjucks = require('nunjucks');
var bodyParser = require('body-parser');

// templating boilerplate setup
server.engine('html', nunjucks.render); // how to render html templates
server.set('view engine', 'html'); // what file extension do our templates have
nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

// body parsing middleware
server.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
server.use(bodyParser.json()); // would be for AJAX requests

server.use(express.static(__dirname+"/stylesheets"))

server.use('/', routes);


models.db.sync({})
.then(function () {
    // make sure to replace the name below with your express app
    server.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
