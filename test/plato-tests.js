/*jslint node: true, white: true*/
/*global describe, it, beforeEach, after*/

"use strict";

var chai = require("chai"),
    expect = chai.expect,
    rimraf = require("rimraf"),
    cccpConfig = require("../cccp.config.json"),
    cccp = require("../index"),
    platoTestUtil;

chai.use(require('chai-fs'));

platoTestUtil = {
    setTestConfig: function (testConfig, testDirName) {
        if (typeof testDirName !== "string") {
            testConfig.plato = testDirName;
        } else {
            testConfig.platoDir = testDirName;
        }

        return testConfig;
    },
    getTestConfig: function (testDirName) {
        var testConf = {};

        Object.keys(cccpConfig).forEach(function (key) {
            testConf[key] = cccpConfig[key];
        });

        return platoTestUtil.setTestConfig(testConf, testDirName);
    }
};

describe("Plato", function () {

    describe("Config", function () {

        describe("dir (1)", function () {
            var testConfig = platoTestUtil.getTestConfig("platoReport-Test"),
                testGulp;

            delete testConfig.plato;

            testGulp = cccp(testConfig);

            testGulp.start("plato:cccp");

            after(function () {
                rimraf(testConfig.platoDir, function () {
                    console.log("(after hook) rimraf: " + testConfig.platoDir + " was removed");
                });
            });

            it("Should have a directory called '" + testConfig.platoDir + "'", function () {
                expect(testConfig.platoDir).to.be.a.directory();
            });
        });

        describe("dir (2)", function () {
            var platoCongifObj = {
                "dir": "platoReport-Test2"
            },
                testConfig = platoTestUtil.getTestConfig(platoCongifObj),
                testGulp = cccp(testConfig);

            testGulp.start("plato:cccp");

            after(function () {
                rimraf(platoCongifObj.dir, function () {
                    console.log("(after hook) rimraf: " + platoCongifObj.dir + " was removed");
                });
            });

            it("Should have a directory called '" + platoCongifObj.dir + "'", function () {
                expect(platoCongifObj.dir).to.be.a.directory();
            });
        });

        describe("dir (3)", function () {
            var platoCongifObj = {
                "dir": "platoReport-Test3",
                "options": {
                    "esversion": 6
                }
            },
                testConfig = platoTestUtil.getTestConfig(platoCongifObj),
                testGulp = cccp(testConfig);

            testGulp.start("plato:cccp");

            after(function () {
                rimraf(platoCongifObj.dir, function () {
                    console.log("(after hook) rimraf: " + platoCongifObj.dir + " was removed");
                });
            });

            it("Should have a directory called '" + platoCongifObj.dir + "'", function () {
                expect(platoCongifObj.dir).to.be.a.directory();
            });
        });
    });
});