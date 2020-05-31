import type { Options } from 'html-minifier-terser';

const htmlLoaderMinimizeConfig: Options = {


// region - Config from old projects

  // collapseBooleanAttributes    : true,
  collapseWhitespace           : true,
  removeAttributeQuotes        : true,
  removeComments               : true,
  removeEmptyAttributes        : true,
  removeRedundantAttributes    : false,
  removeScriptTypeAttributes   : true,
  removeStyleLinkTypeAttributes: true,

// endregion

// region - html-loader default on

  // collapseWhitespace        : false,
  // conservativeCollapse      : false,
  // keepClosingSlash          : false,
  // minifyCSS                 : false,
  // minifyJS                  : false,
  // removeAttributeQuotes     : false,
  // removeComments            : false,
  // removeScriptTypeAttributes: false,
  // removeStyleTypeAttributes: false,
  // useShortDoctype           : false,

// endregion

  caseSensitive              : true,
  collapseBooleanAttributes  : false,
  collapseInlineTagWhitespace: true,
  conservativeCollapse       : true,
  customAttrCollapse         : /^ng-(?:class|style)$/,
  keepClosingSlash           : true,
  minifyCSS                  : true,
  minifyJS                   : true,
  useShortDoctype            : true,
};

const attributesList = [
  {
    tag      : 'img',
    attribute: 'src',
    type     : 'src',
  },
  {
    tag      : 'img',
    attribute: 'srcset',
    type     : 'srcset',
  },
  {
    tag      : 'img',
    attribute: 'data-src',
    type     : 'src',
  },
  {
    tag      : 'img',
    attribute: 'data-srcset',
    type     : 'srcset',
  },
  {
    tag      : 'link',
    attribute: 'href',
    type     : 'src',
    filter   : (tag: string, attribute: string, attributes: Record<string, string>) => {
      if (!/(?:stylesheet|manifest|icon)/i.test(attributes.rel)) {
        return false;
      }

      return true;
    },
  },
];


export default {
  minimize  : htmlLoaderMinimizeConfig,
  attributes: {
    list: attributesList,
  },
};
