const config = require('./dev/config').default;

module.exports.plugins = {
  'postcss-discard-duplicates': {},
  'autoprefixer'                : {},
  ...(process.env.NODE_ENV === 'development' ? {} : {
    cssnano: { safe: true },
  }),
};

// module.exports.to = process.env.NODE_ENV === 'development'
//   ? config.absServing()
//   : config.absOutput()
// ;
