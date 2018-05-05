module.exports = {
  globalImports: ['./global'],
  webpack: config => {
    config.module.rules.push(
      {
        test: /README\.md$/,
        use: [require.resolve('./server/readme-loader')]
      },
      {
        test: /WHATSTHIS.md$/,
        use: ['babel-loader', '@mdx-js/loader']
      }
    );

    return config;
  }
};
