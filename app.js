var models = require('./models');
var server = require('express')()

models.Page.sync({force: true})
.then(function () {
    // make sure to replace the name below with your express app
    server.listen(3000, function () {
        console.log('Server is listening on port 3000!');
    });
})
.catch(console.error);
