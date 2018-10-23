// XXX: Kids, don't try this at home, but it seems this is an entry that is
// loaded on both server and client
const UNIVERSAL_APP_ENTRY_MATCH = 'static/.+?/pages/_app.js';

module.exports = {
  addGlobalEntry(config) {
    const origEntry = config.entry;
    const entry = async () => {
      const entries = await origEntry();

      const entryNames = Object.keys(entries);
      const appEntry = entryNames.find(e => e.match(UNIVERSAL_APP_ENTRY_MATCH));

      if (!appEntry) {
        return entries;
      }

      return {
        ...entries,
        [appEntry]: [require.resolve('./global'), ...entries[appEntry]]
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
      test: /(README|SETUP|WHATSTHIS|CREDITS).md$/,
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
