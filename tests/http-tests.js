var expect  = require('chai').expect;
var request = require('request');
let assert = require('assert');
const IP_ADDRESS = "localhost";

describe('http status code tests', function () {

  it('(mainpage) should respond without error',function(done){
    request.get(`http://${IP_ADDRESS}:3000/`, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('(page with all albums) should respond without error',function(done){
    request.get(`http://${IP_ADDRESS}:3000/albums`, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

  it('(album creation page) should respond without error',function(done){
    request.get(`http://${IP_ADDRESS}:3000/createAlbumMenu`, function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});
