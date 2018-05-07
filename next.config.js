const addLoaders = require('./webpack.extend');

module.exports = {
  webpack: (config, { defaultLoaders }) => {
    return addLoaders(config, defaultLoaders.babel);
  }
};
