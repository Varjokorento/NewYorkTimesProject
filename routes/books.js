
var express = require('express');
var router = express.Router();
var parser = require('body-parser');
var request = require('request');
var url = "";


router.post("/", function(req,res, next) {
    console.log("hello");
    var name = req.body.name;
    var kirjoittaja = req.body.author;
    if (name == "") {
        request.get({
        url: "https://api.nytimes.com/svc/books/v3/reviews.json",
        qs: {
            'api-key': "bf68c93b35e446589a47004179fd0f97",
            'author': kirjoittaja
        },
    }, function(err, response, body) {
      
        console.log(err);
        body = JSON.parse(body);
        console.log(body);
        if(body["status"] == "ERROR") {
            res.redirect("/");
        } else {
        url =body["results"][0]["url"];
        if(body["status"] == "ERROR") {
            res.redirect("/");
        } else {
        var array = body["results"][0]["book_title"];

        for (var i=0; i < body.length; i++) {
            array.push(body["results"][i]["book_title"])
        }
        var summary = body["results"][0]["book_title"];
        res.render("listbooks", {kirjoittaja: kirjoittaja, array:array})
    }
    
    }});
    } else {
    name = name.trim();
    kirjoittaja = kirjoittaja.trim();
    request.get({
        url: "https://api.nytimes.com/svc/books/v3/reviews.json",
        qs: {
            'api-key': "bf68c93b35e446589a47004179fd0f97",
            'title': name,
            'author': kirjoittaja
        },
    }, function(err, response, body) {
        if(err !== null) {
            res.redirect("/");
        }
        body = JSON.parse(body);
        console.log(body);
        if(body["status"] == "ERROR") {
            res.redirect("/");
        } else {
        url = body["results"][0]["url"];
        var summary = body["results"][0]["summary"];
        res.render("books", {name: name, kirjoittaja: kirjoittaja, url:url, summary: summary})
    }
})
}
});


module.exports = router;