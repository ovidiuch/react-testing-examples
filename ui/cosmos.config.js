const addLoaders = require('../webpack.extend');

module.exports = {
  globalImports: ['./global'],
  webpack: config => {
    return addLoaders(config, 'babel-loader');
  }
};
