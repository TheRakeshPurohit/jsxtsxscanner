var expect       = require('expect.js');
var util         = require('util');
var chalk        = require('chalk');
var concat       = require('concat-stream')
var fixtures     = require('../fixtures');
var helpers      = require('../helpers');
var JSONReporter = require('../../lib/reporters/json');
var Inspector    = require('../../lib/inspector');

describe('JSONReporter', function() {
  afterEach(function() {
    helpers.restoreOutput();
  });

  describe('constructor', function() {
    it('accepts an inspector as an argument', function() {
      var inspector = new Inspector(['']);
      var reporter = new JSONReporter(inspector);
      expect(reporter._inspector).to.be(inspector);
    });
  });

  it('prints valid json', function() {
    var inspector = new Inspector([fixtures.smallLines], {
      threshold: 1
    });
    var reporter = new JSONReporter(inspector);

    helpers.captureOutput();
    inspector.run();
    helpers.restoreOutput();

    JSON.parse(helpers.getOutput());
  });

  describe('given a match', function() {
    beforeEach(function() {
      helpers.captureOutput();
    });

    it('prints the instances and their location', function() {
      var inspector = new Inspector([fixtures.smallLines], {
        threshold: 1
      });
      var reporter = new JSONReporter(inspector);
      var matches = helpers.collectMatches(inspector);

      inspector.removeAllListeners('start');
      inspector.removeAllListeners('end');

      inspector.run();
      helpers.restoreOutput();

      var parsedOutput = JSON.parse(helpers.getOutput());
      expect(parsedOutput).to.eql({
        id: '8ee1b37f99571a8917be385c2924f659762c1349',
        instances: [
          {
            path: 'spec/fixtures/smallLines.js',
            lines: [1,1],
            code: 'test = function() { return 1; };'
          },
          {
            path: 'spec/fixtures/smallLines.js',
            lines: [2,2],
            code: 'test = function() { return 2; };'
          },
          {
            path: 'spec/fixtures/smallLines.js',
            lines: [3,3],
            code: 'test = function() { return 3; };'
          }
        ]
      });
    });
  });

  it('can write to a custom stream', function(done) {
    var inspector = new Inspector([fixtures.smallLines], {
      threshold: 1
    });
    var concatStream = concat(onFinish);
    var reporter = new JSONReporter(inspector, {
      writableStream: concatStream
    });
    var matches = helpers.collectMatches(inspector);

    inspector.run();

    function onFinish(data) {
      expect(JSON.parse(data)[0].id).to.be(
        '8ee1b37f99571a8917be385c2924f659762c1349'
      );
      done();
    }
  });
});
