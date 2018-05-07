// XXX: Kids, don't try this at home, but it seems this is an entry that is
// loaded on both server and client
const UNIVERSAL_ENTRY = 'bundles/pages/_app.js';

exports.addGlobalEntry = function(config) {
  let origEntry = config.entry;
  let entry = async () => {
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
};

exports.addLoaders = function(config, babelLoader) {
  let { module } = config;
  let { rules } = module;

  let mdxRule = {
    test: /(README|SETUP|WHATSTHIS).md$/,
    use: [babelLoader, '@mdx-js/loader']
  };
  let importFilesRule = {
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
};
