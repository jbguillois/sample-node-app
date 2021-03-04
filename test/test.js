let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('Testing "/users" resource', () => {
  var server;
  beforeEach(function () {
    server = require('../src/app');
  });
  afterEach(function () {
    server.close();
  });

  it('Testing /users', (done) => {
    chai.request(server)
        .get('/users')
        .end((err, res) => {
              res.should.have.status(200);
              JSON.parse(res.body).should.be.a('array');
              JSON.parse(res.body).length.should.be.eql(4);
          done();
        });
  });

  it('Testing /users/1 => (Tony)', (done) => {
    chai.request(server)
        .get('/users/1')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have .property('name').eql('Tony');
          done();
        });
  });

  it('Testing /users/2 => (Lisa)', (done) => {
    chai.request(server)
        .get('/users/2')
        .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have .property('name').eql('Lisa');
          done();
        });
  });

  it('Testing /users/5 => (not found)', (done) => {
    chai.request(server)
        .get('/users/5')
        .end((err, res) => {
              res.should.have.status(404);
          done();
        });
  });


});

