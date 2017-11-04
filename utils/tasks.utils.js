/*jslint node: true, white: true*/

"use strict";

var props = {},
    tasksUtil;

tasksUtil = {
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
            gulp = tasksUtil.addTaskFunc(taskName, config, beforeArray, gulp);
        } else {
            gulp = tasksUtil.addTaskArray(taskName, beforeArray, gulp);
        }

        return gulp;
    },
    addTasks: function (gulp, config) {
        var taskNames = Object.keys(props.tasks).concat(["cccp"]);

        taskNames.forEach(function (taskName, index) {
            var beforeArray = taskNames.slice(0, index);

            gulp = tasksUtil.addTask(taskName, config, beforeArray, gulp);
        });

        return gulp;
    },
    setTasks: function (tasks) {
        props.tasks = tasks;
    }
};

module.exports = tasksUtil;