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
    setTestDir: function (cccpConfig, testDirName) {
        cccpConfig.platoDir = testDirName;

        return cccpConfig;
    },
    getTestConfig: function (testDirName, platoCongifObj) {
        var testConfig = Object.create(cccpConfig);

        testConfig.plato = platoCongifObj;

        return util.setTestDir(testConfig, testDirName);
    }
};

describe("Plato tests", function () {

    describe("Basic test", function () {
        var testConfig = util.getTestConfig("platoReport-Test"),
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

    describe("Plato config object test", function () {
        var platoCongifObj = {
            "dir": "platoReport-Test2"
        },
            testConfig = util.getTestConfig("platoReport-Test", platoCongifObj),
            testGulp = cccp(testConfig);

        testGulp.start("plato:cccp");

        after(function (done) {
            rimraf("platoReport-Test*", {}, function () {
                console.log("(after hook) rimraf: " + platoCongifObj.dir + " was removed");
                done();
            });
        });

        it("Should have a directory called '" + platoCongifObj.dir + "'", function () {
            expect(platoCongifObj.dir).to.be.a.directory();
        });
    });
});