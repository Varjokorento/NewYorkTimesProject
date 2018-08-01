
var express = require('express');
var router = express.Router();
var parser = require('body-parser');
var request = require('request');
var url = "";


router.post("/", function(req,res, next) {
    console.log("hello");
    var name = req.body.name;
    var kirjoittaja = req.body.author;
    console.log(name);
    console.log(kirjoittaja);
    request.get({
        url: "https://api.nytimes.com/svc/books/v3/reviews.json",
        qs: {
            'api-key': "bf68c93b35e446589a47004179fd0f97",
            'title': name,
            'author': kirjoittaja
        },
    }, function(err, response, body) {
        body = JSON.parse(body);
        url =body["results"][0]["url"];
        var summary = body["results"][0]["summary"];
        res.render("books", {name: name, kirjoittaja: kirjoittaja, url:url, summary: summary})
    })
});

module.exports = router;