const { addGlobalEntry, addLoaders } = require('./webpack.extend');
const { getTestKindIds, getTestNames } = require('./server/testFiles');

module.exports = {
  webpack: (config, { defaultLoaders }) => {
    return addLoaders(addGlobalEntry(config), defaultLoaders.babel);
  },
  exportPathMap() {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      ...getTestPaths()
    };
  }
};

function getTestPaths() {
  let paths = {};

  getTestKindIds().forEach(testKindId => {
    paths[`/${testKindId}`] = { page: '/', query: { testKindId } };
    paths[`/${testKindId}/setup`] = {
      page: '/',
      query: { testKindId, sectionName: 'setup' }
    };

    getTestNames(testKindId).forEach(testName => {
      paths[`/${testKindId}/${testName}`] = {
        page: '/',
        query: { testKindId, sectionName: testName }
      };
    });
  });

  return paths;
}
