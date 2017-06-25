/*jslint node: true, white: true*/

"use strict";

var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    plato = require("plato"),
    util = require("./util"),
    timeOut,
    tasks;

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
        var platoConfig = util.getPlatoConfig(config);

        return plato.inspect(config.complexityCheck, platoConfig.dir, {}, function () {
            clearTimeout(timeOut);

            timeOut = setTimeout(function () {
                console.log("Plato done");
            }, 0);
        });
    }
};

module.exports = function (config) {
    util.setTasks(tasks);

    return util.addTasks(gulp, config);
};