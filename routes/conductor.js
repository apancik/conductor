"use strict";

var express = require("express");
var router = express.Router();

var _ = require("underscore");
var fs = require("fs");
var csv = require("ya-csv");

var job = {
    data: [],
    results: []
};

// =========
// DASHBOARD
// =========

router.get("/", function (request, response) {
    response.render("dashboard", {
        hostname: request.hostname,
        loaded: job.dataLength,
        left: job.data.length,
        program: job.program
    });
});

// =======
// PROGRAM
// =======

/*
curl -X POST localhost:3000/program \
  -F "program=@program.js"
*/
router.route("/program")
    .post(function (request, response) {
        job.program = fs.readFileSync(
            request.files.program.path, "utf8"
        );
        response.redirect("/");
    })
    .get(function (request, response) {
        response.setHeader("Content-type", "text/javascript");
        if (job.program) {
            response.render("worker", {
                program: job.program
            });
        } else {
            response.send("");
        }
    });

// ====
// DATA
// ====

/*
curl -X POST localhost:3000/data \
    -F "data=@data.csv"
*/
router.route("/data")
    .post(function (request, response) {
        var reader = csv.createCsvFileReader(
            request.files.data.path
        );

        job.data = [];
        job.results = [];

        var key = 0;

        reader.addListener("data", function (row) {
            // add each row separately to the data pool
            job.data.push({
                key: key++,
                value: row
            });
        });

        reader.addListener("end", function () {
            job.dataLength = job.data.length;
        });

        response.redirect("/");
    })
    .get(function (request, response) {
        // pick random task from the data pool
        var task = job.data[Math.floor(Math.random() * job.data.length)];

        if (job.program && task) {
            response.send(
                task
            );
        } else {
            response.status(404);
            response.send();
        }
    });

// =======
// RESULTS
// =======

/*
curl -X POST localhost:3000/results \
    --header "Content-type: application/json" \
    --data '{"key":1, "value":"anything"}'
*/
router.route("/results")
    .post(function (request, response) {
        // traverse the whole job pool to remove already processed bit
        for (var index = 0; index < job.data.length; index++) {
            if (request.body.key === job.data[index].key) {
                job.data.splice(index, 1);
                
                // add only non-null values to the results pool
                // this allows map functions that don't return the response if not interesting
                if (request.body.value) {
                    job.results.push(request.body.value);
                }
            }
        }
        response.send();
    })
    .get(function (request, response) {
        response.setHeader("Content-type", "text/csv");
        response.send(
            job.results.join("\n")
        );
    });

module.exports = router;