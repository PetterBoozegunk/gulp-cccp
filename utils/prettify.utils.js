/*jslint node: true, this: true*/

"use strict";

var through2 = require("through2"),
    jsBeautify = require("js-beautify"),
    config = require("../cccp.config.json").prettify || {},
    prettifyUtils;

prettifyUtils = {
    indentConditionalOperators: function () {
        return through2.obj(function (file, ignore, callback) {
            var stream = this,
                newFileContents = jsBeautify(file.contents.toString(), config),
                lines = newFileContents.split("\n");

            lines.forEach(function (line, index) {
                if (line.match(/(\s(\?|:)\s)/)) {
                    var lineStart = line.match(/^\s+/),
                        newIndex = lineStart + "    ";

                    lines[index] = line.replace(/(\s)(\?|:)(\s)/g, "\n" + newIndex + "$2$3");
                }
            });

            file.contents = new Buffer(lines.join("\n"));

            stream.push(file);

            callback();
        });
    }
};

module.exports = prettifyUtils;