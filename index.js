/*jslint node: true*/

"use strict";

module.exports = function (config) {

    var gulp = require("gulp"),
        plugins = require("gulp-load-plugins")(),
        plato = require("plato");

    gulp.task("prettify", function () {
        return gulp.src(config.checkFixSrc)
            .pipe(plugins.jsPrettify({
                "jslint_happy": true
            }))
            .pipe(plugins.lineEndingCorrector({
                eolc: "LF"
            }))
            .pipe(gulp.dest(function (file) {
                return file.base;
            }));
    });

    gulp.task("jslint", ["prettify"], function () {
        return gulp.src(config.checkFixSrc)
            .pipe(plugins.jslint())
            .pipe(plugins.jslint.reporter('default', false))
            .pipe(plugins.jslint.reporter('stylish', {}));
    });

    gulp.task("complexity", ["jslint"], function () {
        return gulp.src(config.complexityCheck)
            .pipe(plugins.complexity());
    });


    gulp.task("plato", ["complexity"], function () {
        plato.inspect(config.complexityCheck, config.platoDir, {}, function () {
            setTimeout(function () {
                console.log("Plato done");
            }, 0);
        });
    });

};