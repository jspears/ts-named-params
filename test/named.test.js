"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const ts_named_parameters_1 = require("ts-named-parameters");
describe("named", function () {
    it("should wrap an arg", function () {
        const fn = (0, ts_named_parameters_1.named)((v) => {
            return `hello ${v.name}`;
        });
        (0, chai_1.expect)(fn("name", "world")).to.eql("hello world");
    });
    it("should wrap an arg and an object", function () {
        const fn = (0, ts_named_parameters_1.named)((v) => {
            return `hello ${v.name}`;
        });
        (0, chai_1.expect)(fn({ "name": "world" })).to.eql("hello world");
    });
    it("should wrap an optional arg", function () {
        const fn = (0, ts_named_parameters_1.named)((v) => {
            return `hello ${v.name}, ${v.opt || 'no opt'}`;
        });
        (0, chai_1.expect)(fn("name", "world")).to.eql("hello world, no opt");
        (0, chai_1.expect)(fn("name", "world", "opt", "you rock")).to.eql("hello world, you rock");
    });
    it("should wrap an optional arg with an object", function () {
        const fn = (0, ts_named_parameters_1.named)((v) => {
            return `hello ${v.name}, ${v.opt || 'no opt'}`;
        });
        (0, chai_1.expect)(fn({ "name": "world" })).to.eql("hello world, no opt");
        (0, chai_1.expect)(fn({ "name": "world", "opt": "you rock" })).to.eql("hello world, you rock");
    });
    it("should fail when not valid", function () {
        const fn = (0, ts_named_parameters_1.named)((v) => {
            return `hello ${v.name}, ${v.opt || 'no opt'}`;
        });
        (0, chai_1.expect)(() => fn(null, 'what')).to.throw();
    });
});
