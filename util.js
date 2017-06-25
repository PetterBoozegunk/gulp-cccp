/*jslint node: true, white: true*/

"use strict";

var props = {},
    util;

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
            return props.tasks[taskName](config);
        });

        gulp.task(taskName + ":cccp", function () {
            return props.tasks[taskName](config);
        });

        return gulp;
    },
    addTaskArray: function (taskName, beforeArray, gulp) {
        gulp.task(taskName, beforeArray);

        return gulp;
    },
    addTask: function (taskName, config, beforeArray, gulp) {
        if (props.tasks[taskName]) {
            gulp = util.addTaskFunc(taskName, config, beforeArray, gulp);
        } else {
            gulp = util.addTaskArray(taskName, beforeArray, gulp);
        }

        return gulp;
    },
    addTasks: function (gulp, config) {
        var taskNames = Object.keys(props.tasks).concat(["cccp"]);

        taskNames.forEach(function (taskName, index) {
            var beforeArray = taskNames.slice(0, index);

            gulp = util.addTask(taskName, config, beforeArray, gulp);
        });

        return gulp;
    },
    getPlatoDir: function (config) {
        return config.platoDir || "report";
    },
    setPlatoDir: function (config, platoConfig) {
        if (!platoConfig.dir) {
            platoConfig.dir = util.getPlatoDir(config);
        }

        return platoConfig;
    },
    getPlatoConfig: function (config) {
        var platoConfig = config.plato || {};

        return util.setPlatoDir(config, platoConfig);
    },
    setTasks: function (tasks) {
        props.tasks = tasks;
    }
};

module.exports = util;