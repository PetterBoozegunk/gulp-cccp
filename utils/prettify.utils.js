/*jslint node: true, white: true*/

"use strict";

var through2 = require("through2"),
    prettifyUtils;

prettifyUtils = {
    indentConditionalOperators: function () {
        return through2.obj(function (file, encoding, callback) {

            //console.log("pipe: ", file, encoding, callback);
            this.push(file);

            callback();
        });
    }
};

module.exports = prettifyUtils;