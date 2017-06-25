/*jslint node: true*/

"use strict";

var gulp = require("gulp"),
    cccp = require("./index"),
    cccpConfig = require("./cccp.config.json");

cccp(cccpConfig);

gulp.task("default", function () {
    gulp.start("cccp");
});