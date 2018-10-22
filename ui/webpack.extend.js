// XXX: Kids, don't try this at home, but it seems this is an entry that is
// loaded on both server and client
const UNIVERSAL_ENTRY = 'static/development/pages/_app.js';

module.exports = {
  addGlobalEntry(config) {
    const origEntry = config.entry;
    const entry = async () => {
      const entries = await origEntry();

      if (!entries[UNIVERSAL_ENTRY]) {
        return entries;
      }

      return {
        ...entries,
        [UNIVERSAL_ENTRY]: [
          require.resolve('./global'),
          ...entries[UNIVERSAL_ENTRY]
        ]
      };
    };

    return {
      ...config,
      entry
    };
  },

  addLoaders: function(config, babelLoader) {
    const { module } = config;
    const { rules } = module;

    const mdxRule = {
      test: /(README|SETUP|WHATSTHIS).md$/,
      use: [babelLoader, '@mdx-js/loader']
    };
    const importFilesRule = {
      test: require.resolve('./import-files'),
      use: require.resolve('./webpack-loaders/import-tests-loader')
    };

    return {
      ...config,
      module: {
        ...module,
        rules: [...rules, mdxRule, importFilesRule]
      }
    };
  }
};
