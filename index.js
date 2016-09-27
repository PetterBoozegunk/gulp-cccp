/*jslint node: true*/

"use strict";

var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    plato = require("plato"),

    tasks = {
        prettify: function (config) {
            var prettifyOptions = config.prettify || {
                jslint_happy: true
            };

            return gulp.src(config.checkFixSrc)
                .pipe(plugins.jsPrettify(prettifyOptions))
                .pipe(plugins.lineEndingCorrector({
                    eolc: "LF"
                }))
                .pipe(gulp.dest(function (file) {
                    return file.base;
                }));
        },
        jslint: function (config) {
            return gulp.src(config.checkFixSrc)
                .pipe(plugins.jslint(config.jslint))
                .pipe(plugins.jslint.reporter('default', false))
                .pipe(plugins.jslint.reporter('stylish', {}));
        },
        complexity: function (config) {
            return gulp.src(config.complexityCheck)
                .pipe(plugins.complexity());
        },
        plato: function (config) {
            var platoDir = config.platoDir || "report";

            return plato.inspect(config.complexityCheck, platoDir, {}, function () {
                setTimeout(function () {
                    console.log("Plato done");
                }, 0);
            });
        }
    };

module.exports = function (config) {
    gulp.task("prettify", function () {
        return tasks.prettify(config);
    });
    gulp.task("jslint", ["prettify"], function () {
        return tasks.jslint(config);
    });
    gulp.task("complexity", ["jslint"], function () {
        return tasks.complexity(config);
    });
    gulp.task("plato", ["complexity"], function () {
        return tasks.plato(config);
    });
    gulp.task("cccp", ["plato"]);
};