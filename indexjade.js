var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// New Code


var app = express();


app.set('views', __dirname + '/Views');
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/Public'));



app.get('/', function (req, res) {
    res.render('index',
        { title : 'Home' }
    )
});

app.listen(3000);
