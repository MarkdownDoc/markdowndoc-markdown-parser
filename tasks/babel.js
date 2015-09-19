'use strict';
//babel config

module.exports = {
  options: {
    stage: 1,
    loose: ['all'],
    optional: ['runtime', 'es7.asyncFunctions']
  },
  test: {
    options: {
      sourceMap: true
    },
    files: {
      'tests/specs/parser.js': 'src/index.js'
    }
  },
  dist: {
    options: {
      sourceMap: true
    },
    files: {
      'dist/index.js': 'src/index.js'
    }
  }
};
