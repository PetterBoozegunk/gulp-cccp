/*jslint node: true, white: true*/
/*global describe, it, beforeEach, after*/

"use strict";

var chai = require("chai"),
    expect = chai.expect,
    rimraf = require("rimraf"),
    cccpConfig = require("../cccp.config.json"),
    cccp = require("../index"),
    util;

chai.use(require('chai-fs'));

util = {
    setTestDir: function (cccpConfig) {
        cccpConfig.platoDir = "platoReport-Test";

        return cccpConfig;
    },
    getTestConfig: function () {
        var testConfig = Object.create(cccpConfig);

        return util.setTestDir(testConfig);
    }
};

describe("Plato tests", function () {

    describe("Basic test", function () {
        var testConfig = util.getTestConfig(),
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

        // it("Should have a '" + testConfig.platoDir + "/index.html' file", function () {
        //     expect(testConfig.platoDir + "/index.html").to.be.a.file();
        // });
    });
});