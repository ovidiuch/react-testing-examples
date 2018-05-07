const addLoaders = require('../webpack.loaders');

module.exports = {
  globalImports: ['./global'],
  webpack: config => {
    return addLoaders(config, 'babel-loader');
  }
};
