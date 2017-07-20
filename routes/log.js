var fs = require("fs");
var convert = require("../ansi");
var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
    if (req.user) {
        next();
    } else {
        req.session.referer = "/log";
        res.redirect("/login");
    }
}, function(req, res, next) {
    res.render("log", {
        controller: "log",
        title: "Log",
        user: req.user
    });
});

router.get("/raw", function(req, res, next) {
    fs.readFile(hb.log, function (err, data) {
        res.send(convert(data));
    });
});

router.get("/clear", function (req, res, next) {
    if (req.user) {
        next();
    } else {
        req.session.referer = "/log";
        res.redirect("/login");
    }
}, function(req, res, next) {
    fs.truncate(hb.log, 0, function () {
        app.get("log")("Log cleared by " + req.user.name + ".");
    });
});

module.exports = router;
