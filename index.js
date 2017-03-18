/*jslint node: true*/

"use strict";

var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    plato = require("plato"),
    util,
    tasks;

util = {
    copyProperties: function (from, to) {
        var newObj = to || {};

        Object.keys(from || {}).forEach(function (propName) {
            newObj[propName] = from[propName];
        });

        return newObj;
    },
    getOptions: function (defaults, config) {
        var options = util.copyProperties(defaults, {});

        return util.copyProperties(config, options);
    }
};

tasks = {
    prettify: function (config) {
        var conf = config || {},
            prettifyOptions = util.getOptions({
                jslint_happy: true
            }, conf.prettify);

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

    gulp.task("jslint:cccp", function () {
        return tasks.jslint(config);
    });
    gulp.task("jslint", ["prettify"], function () {
        return tasks.jslint(config);
    });

    gulp.task("complexity:cccp", function () {
        return tasks.complexity(config);
    });
    gulp.task("complexity", ["jslint"], function () {
        return tasks.complexity(config);
    });

    gulp.task("plato:cccp", function () {
        return tasks.plato(config);
    });
    gulp.task("plato", ["complexity"], function () {
        return tasks.plato(config);
    });

    gulp.task("cccp", ["plato"]);
};