var express = require('express');
var app = express();

const port = 3000;

app.get("/toto", function(req,res){ res.send("Salut toto")} );


app.listen(port, function(){
    console.log('Serveur listing on port : ' + port);
});