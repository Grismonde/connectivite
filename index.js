/* var express = require('express');
var app = express();

const port = process.env.PORT || 3000;

app.get("/toto", function(req,res){ res.send("Salut toto")} );


app.listen(port, function(){
    console.log('Serveur listing on port : ' + port);
}); */

const express = require('express');
const app = express();
const request = require('request');
const cheerio = require('cheerio');
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/metadata', (req, res) => {
  const url = req.query.url;
  request(url, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);
      const metadata = {
        title: $('meta[property="og:title"]').attr('content'),
        description: $('meta[property="og:description"]').attr('content'),
        image: $('meta[property="og:image"]').attr('content')
      };
      res.send(metadata);
    } else {
      res.status(400).send('URL invalide');
    }
  });
});

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
