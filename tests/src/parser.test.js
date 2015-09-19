'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;

var parser = require('../specs/parser');

describe('#parser', function () {
  it('If options and folder path is set, get a html string.', function () {
    var options = {
      'highlight': true,
      'linkscheme': true,
      'responsiveimage': true,
      'checkbox': true
    },
    test = parser(options, './tests/fixture/one.md');

    expect(typeof test === 'string').to.equal(true);
    expect(test).to.equal('<h1>one</h1>\n<h1>one2</h1>\n');
  });
});
