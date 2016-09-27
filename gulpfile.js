/*jslint node: true*/

"use strict";

var gulp = require("gulp"),
    cccp = require("./index");

cccp({
    checkFixSrc: [
        "*.js",
        "*.json",
        "test/*.js",
        "!node_modules/**",
        "!.idea/**"
    ],
    complexityCheck: ["*.js"],
    prettify: {
        jslint_happy: true
    },
    platoDir: "report"
});

gulp.task("default", function () {
    gulp.start("cccp");
});