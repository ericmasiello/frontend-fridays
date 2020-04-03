const sass = require('node-sass');

module.exports = function processSass(data, filename) {
  return sass
    .renderSync({
      data: data,
      file: filename,
      outputStyle: 'compressed',
    })
    .css.toString('utf8');
};
