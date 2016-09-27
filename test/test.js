/*jslint node: true*/
/*global describe, it, beforeEach*/

"use strict";

var assert = require("assert"),
    expect = require("chai").expect,
    gulp = require("gulp"),
    cccp = require("../index");

cccp();

describe("Add cccp tasks", function () {
    var tasks = gulp.tasks;

    it("Gulp should have a 'prettify' task", function () {
        expect(tasks).to.have.any.key('prettify');
    });

    it("Gulp should have a 'jslint' task", function () {
        expect(tasks).to.have.any.key('jslint');
    });

    it("Gulp should have a 'complexity' task", function () {
        expect(tasks).to.have.any.key('complexity');
    });

    it("Gulp should have a 'plato' task", function () {
        expect(tasks).to.have.any.key('plato');
    });

    it("Gulp should have a 'cccp' task", function () {
        expect(tasks).to.have.any.key('cccp');
    });
});