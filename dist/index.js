'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _readFile = require('read-file');

var _readFile2 = _interopRequireDefault(_readFile);

var _highlightJs = require('highlight.js');

var _highlightJs2 = _interopRequireDefault(_highlightJs);

var _markdownIt = require('markdown-it');

var _markdownIt2 = _interopRequireDefault(_markdownIt);

var _markdownItCheckbox = require('markdown-it-checkbox');

var _markdownItCheckbox2 = _interopRequireDefault(_markdownItCheckbox);

var _markdownItLinkscheme = require('markdown-it-linkscheme');

var _markdownItLinkscheme2 = _interopRequireDefault(_markdownItLinkscheme);

var _markdownItResponsive = require('markdown-it-responsive');

var _markdownItResponsive2 = _interopRequireDefault(_markdownItResponsive);

exports['default'] = function (options, filepath) {
  function responsiveOption() {
    return {
      responsive: {
        'srcset': {
          'header-*': [{
            width: 480,
            rename: {
              suffix: '-small'
            }
          }, {
            width: 768,
            rename: {
              suffix: '-medium'
            }
          }]
        },
        'sizes': {
          'header-*': '(min-width: 48em) 33.3vw, 100vw'
        }
      }
    };
  }

  function markdownHighlight(str, lang) {
    if (options.highlight) {
      return '';
    }

    if (lang && _highlightJs2['default'].getLanguage(lang)) {
      try {
        return _highlightJs2['default'].highlight(lang, str).value;
      } catch (__) {
        return ''; // use external default escaping
      }
    }

    try {
      return _highlightJs2['default'].highlightAuto(str).value;
    } catch (__) {
      return ''; // use external default escaping
    }
  }

  function markdown() {
    var md = new _markdownIt2['default']({
      highlight: function highlight(str, lang) {
        return markdownHighlight(options, str, lang);
      }
    });

    if (options.linkscheme) {
      md.use(_markdownItLinkscheme2['default']);
    }

    if (options.responsiveimage) {
      md.use(_markdownItResponsive2['default'], responsiveOption());
    }

    if (options.checkbox) {
      md.use(_markdownItCheckbox2['default']);
    }

    return md;
  }

  function renderHtml() {
    var md = markdown(options);
    var file = _readFile2['default'].sync(filepath, { encoding: 'utf8' });

    return md.render(file, { encoding: 'utf8' });
  }

  return renderHtml(options, filepath);
};

module.exports = exports['default'];
//# sourceMappingURL=index.js.map
