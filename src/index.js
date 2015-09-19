import read from 'read-file';
import hljs from 'highlight.js';
import MarkdownIt from 'markdown-it';
import checkbox from 'markdown-it-checkbox';
import linkscheme from 'markdown-it-linkscheme';
import responsive from 'markdown-it-responsive';

export default function(options, filepath) {
  function responsiveOption() {
    return {
      responsive: {
        'srcset': {
          'header-*': [{
            width: 480,
            rename: {
              suffix: '-small',
            },
          }, {
            width: 768,
            rename: {
              suffix: '-medium',
            },
          }],
        },
        'sizes': {
          'header-*': '(min-width: 48em) 33.3vw, 100vw',
        },
      },
    };
  }

  function markdownHighlight(str, lang) {
    if (options.highlight) {
      return '';
    }

    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value;
      } catch (__) {
        return ''; // use external default escaping
      }
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (__) {
      return ''; // use external default escaping
    }
  }

  function markdown() {
    const md = new MarkdownIt({
      highlight: function(str, lang) {
        return markdownHighlight(options, str, lang);
      },
    });

    if (options.linkscheme) {
      md.use(linkscheme);
    }

    if (options.responsiveimage) {
      md.use(responsive, responsiveOption());
    }

    if (options.checkbox) {
      md.use(checkbox);
    }

    return md;
  }

  function renderHtml() {
    const md = markdown(options);
    const file = read.sync(filepath, { encoding: 'utf8' });

    return md.render(file, { encoding: 'utf8' });
  }

  return renderHtml(options, filepath);
}
