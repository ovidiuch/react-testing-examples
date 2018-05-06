module.exports = {
  globalImports: ['./global'],
  webpack: config => {
    config.module.rules.push({
      test: /(README|SETUP|WHATSTHIS).md$/,
      use: ['babel-loader', '@mdx-js/loader']
    });

    return config;
  }
};
