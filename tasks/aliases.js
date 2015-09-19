module.exports = {
  'test': [
    'newer:jsonlint',
    'newer:jscs',
    'newer:jshint',
    'eslint:dev',
    'babel:test',
    'mochacli'
  ],
  'default': [
    'clean',
    'test',
    'babel:dist'
  ]
};
