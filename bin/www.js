#!/usr/bin/env node

var app = require("../app");

app.set("port", process.env.PORT || 3000);

var server = app.listen(app.get("port"), function () {
    console.log("Conductor server listening on port " + server.address().port);
});