const { addGlobalEntry, addLoaders } = require('./webpack.extend');

module.exports = {
  webpack: (config, { defaultLoaders }) => {
    return addLoaders(addGlobalEntry(config), defaultLoaders.babel);
  }
};
