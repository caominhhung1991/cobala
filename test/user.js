var shoule = require("should");
var request = require("request");
var expect = require("chai").expect;
var server = require("./../server");
var baseUrl = "http://localhost:3000/api";
var util = require("util");

describe("/GET api product", function() {
    beforeEach((done) => {
        console.log("done know!");
        done();
    });
    afterEach(() => {
        console.log("exit");
        process.exit(0);
    })
    it('return luke', function(done) {
        request.get({url: baseUrl + '/products/'}, function(error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        })
    })
})  