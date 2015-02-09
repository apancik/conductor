// ============
// DEPENDENCIES
// ============

var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
var multer = require("multer");

var app = express();

// ================
// MIDDLEWARE SETUP
// ================

// views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hjs");

// static assets
app.use(express.static(path.join(__dirname, "public")));

// request parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// file upload
app.use(multer({
    dest: "./uploads/"
}));

app.use(logger("dev"));

// ======
// ROUTES
// ======

var conductor = require("./routes/conductor");
app.use("/", conductor);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// ==============
// ERROR HANDLERS
// ==============

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
    app.use(function (error, req, res, next) {
        res.status(error.status || 500);
        res.render("error", {
            message: error.message,
            error: error
        });
    });
}

// production error handler - no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: {}
    });
});

module.exports = app;