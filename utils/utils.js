/*jslint node: true, white: true*/

"use strict";

var utilFiles = [
    "tasks.utils.js",
    "plato.utils.js"
],
    util;

util = {
    getUtils: function () {
        var exportUtil = util;

        utilFiles.forEach(function (file) {
            var utilFile = require("./" + file);

            exportUtil = util.copyProperties(utilFile, util);
        });

        return exportUtil;
    },
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
    }
};

module.exports = util.getUtils();