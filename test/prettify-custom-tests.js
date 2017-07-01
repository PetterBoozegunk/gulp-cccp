/*jslint node: true, white: true, this: true*/
/*global describe, it, beforeEach, after*/

"use strict";

var chai = require("chai"),
    expect = chai.expect,
    through2 = require("through2"),
    vfs = require("vinyl-fs"),
    prettifyUtils = require("../utils/prettify.utils");

describe('Prettify custom tests', function () {
    var filecount = 0,
        expectedFileContents = "",
        resultFileContents = "",
        filesDone = false,
        interval,
        setFileContents = function (file, filecount) {
            if (filecount === 0) {
                expectedFileContents = file.contents.toString();
            }

            if (filecount === 1) {
                resultFileContents = file.contents.toString();
            }
        };

    vfs.src(["./test-files/fixtures/prettify-conditional-operator.js"])
        .pipe(prettifyUtils.indentConditionalOperators())
        .pipe(vfs.dest("./test-files/results"))
        .on("end", function () {

            vfs.src([
                "./test-files/expected/prettify-conditional-operator.js",
                "./test-files/results/prettify-conditional-operator.js"
            ])
                .pipe(through2.obj(function (file, ignore, callback) {
                    var that = this;

                    setFileContents(file, filecount);

                    that.push(file);

                    filecount += 1;

                    if (filecount >= 2) {
                        filesDone = true;
                    }

                    callback();
                }));
        });



    it('should indent conditional operators', function (done) {
        interval = setInterval(function () {
            if (filesDone) {
                clearInterval(interval);

                expect(resultFileContents).to.equal(expectedFileContents);

                done();
            }
        }, 10);

    });
});