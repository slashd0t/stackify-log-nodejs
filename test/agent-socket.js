'use strict'

process.env['STACKIFY_TEST'] = true

var expect = require('chai').expect;
var rewire = require('rewire');
var root_path = '../';

var api = rewire(root_path + 'lib/api');
var logMessage = require(root_path + 'test/fixtures/log-message')
var messages = logMessage.getMessages;

describe('Socket Transport', function() {
  it('Log messages successfully send', function (done) {
    api.methods.sendToSocket(messages, function(err, result) {
      expect(result.success).to.be.true
      expect(result.message).to.contain('OK')
      done();
    })
  });

  it('Log messages is not available', function (done) {
    api.methods.sendToSocket(null, function(result) {
      expect(result.error).to.be.true
      expect(result.message).to.contain('No messages found.')
      done();
    })
  })
});
