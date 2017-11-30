var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('./../server');
var should = chai.should();

chai.use(chaiHttp);
describe('User API Tests', () => {
    var userId = "";
    var userIdExisted = "";

    it('Should return a full list of users', (done) => {
        chai.request(server)
        .get('/api/user')
        // .send(pet)
        .end((err, res) => {
            res.should.have.status(200);
            JSON.parse(res.text).data.should.be.a('array');
            // res.body.should.have.property('message').eql("Pet is invalid!");
            done();
        });
    });

    it('Should return a user when login right email, password', (done) => {
        var pass = 'hung1991';
        chai.request(server)
        .get("/api/user/caominhhung1991@gmail.com")
        .end((err, res) => {
            res.should.have.status(200);
            console.log( );
            res.body.should.be.a('object');
            JSON.parse(res.text).data.password.should.equal(pass);
            done();
        });
    });

    it('Should not return a user when login wrong email', (done) => {
        var pass = 'passtest';
        chai.request(server)
        .get("/api/user/emailTestToWrong@gmail.com")
        .end((err, res) => {
            // console.log(res.body);
            res.should.have.status(200);
            // console.log( );
            // res.body.should.be.a('object');
            JSON.parse(res.text).data.password.should.not.equal(pass);
            done();
        });
    });

    // it('Should update a single user', (done) => {

    // });

});