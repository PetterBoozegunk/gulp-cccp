/*jslint node: true, white: true*/

"use strict";

var gulp = require("gulp"),
    plugins = require("gulp-load-plugins")(),
    plato = require("plato"),
    util,
    tasks;

util = {
    isObject: function (someThing) {
        return (someThing && typeof someThing === "object");
    },
    returnObj: function (someThing) {
        return util.isObject(someThing) ? someThing : {};
    },
    copyProperties: function (from, to) {
        var newObj = util.returnObj(to);

        Object.keys(util.returnObj(from)).forEach(function (propName) {
            newObj[propName] = from[propName];
        });

        return newObj;
    },
    getOptions: function (defaults, config) {
        var options = util.copyProperties(defaults, {});

        return util.copyProperties(config, options);
    },
    addTaskFunc: function (taskName, config, beforeArray, gulp) {
        gulp.task(taskName, beforeArray, function () {
            return tasks[taskName](config);
        });

        gulp.task(taskName + ":cccp", function () {
            return tasks[taskName](config);
        });

        return gulp;
    },
    addTaskArray: function (taskName, beforeArray, gulp) {
        gulp.task(taskName, beforeArray);

        return gulp;
    },
    addTask: function (taskName, config, beforeArray, gulp) {
        if (tasks[taskName]) {
            gulp = util.addTaskFunc(taskName, config, beforeArray, gulp);
        } else {
            gulp = util.addTaskArray(taskName, beforeArray, gulp);
        }

        return gulp;
    },
    addTasks: function (gulp, config) {
        var taskNames = Object.keys(tasks).concat(["cccp"]);

        taskNames.forEach(function (taskName, index) {
            var beforeArray = taskNames.slice(0, index);

            gulp = util.addTask(taskName, config, beforeArray, gulp);
        });

        return gulp;
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
    return util.addTasks(gulp, config);
};