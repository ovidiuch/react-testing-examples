const addLoaders = require('./webpack.loaders');

module.exports = {
  webpack: (config, { defaultLoaders }) => {
    return addLoaders(config, defaultLoaders.babel);
  }
};
