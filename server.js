var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var routes = require('./routing/routes.js');

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

routes(app);

app.listen(PORT, function() {
    console.log("Server started on port", PORT);
});