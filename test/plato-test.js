/*jslint node: true, white: true*/
/*global describe, it, beforeEach, after*/

"use strict";

var chai = require("chai"),
    expect = chai.expect,
    rimraf = require("rimraf"),
    cccp = require("../index");

chai.use(require('chai-fs'));

describe("Plato tests", function () {

    describe("Basic test", function () {
        var testConfig = {
            complexityCheck: [
                "*.js",
                "test/*.js"
            ],
            platoDir: "platoDir-test"
        },
            testGulp = cccp(testConfig);

        testGulp.start("plato:cccp");

        after(function (done) {
            rimraf(testConfig.platoDir, {}, function () {
                console.log("(after hook) rimraf: " + testConfig.platoDir + " was removed");
                done();
            });
        });

        it("Should have a directory called '" + testConfig.platoDir + "'", function () {
            expect(testConfig.platoDir).to.be.a.directory();
        });
    });
});