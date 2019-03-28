var express = require('express');
var path = require('path');
var app = express();

//setting port
var port = process.env.PORT || 5000;



app.use(express.static(path.join(__dirname, 'lib')));

app.get('/',function(req, res) {
    res.sendFile(__dirname + '/index.html');

});




//server setUp
app.listen(port);
console.log('now listening to port: 5000');