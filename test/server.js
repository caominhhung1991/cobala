const shoule = require("should");
const request = require("request");
const expect = require("chai").expect;
const assert = require("chai").assert;
const sayHello = require("./../server").sayHello;
const addNumber = require("./../server").addNumber;
const util = require("util");

describe("Server test run ok", () => {
    it("sayHello should return 'Running on localhost:3000'", (done) => {
        expect(sayHello()).to.equal('Running on localhost:3000');
        done();
    })
    it("sayHello should return type string", (done) => {
        assert.typeOf(sayHello(), 'string');
        done();
    })
    it("addNumber should return above 5", (done) => {
        let result = addNumber(5, 5);
        assert.isAbove(result, 5, '10 is strictly greater than 5');
        done();
    })
})