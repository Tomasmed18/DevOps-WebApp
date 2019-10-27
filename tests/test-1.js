var expect  = require('chai').expect;
var request = require('request');
let assert = require('assert');

describe('test http', function () {

  it('mainpage should respond without error',function(done){
    request.get('http://localhost:3000/', function(error, response, body) {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });

});
