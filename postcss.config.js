module.exports = (config) => [
  require('stylelint')(),
  require('postcss-cssnext')({
    browsers: 'last 2 versions',
    features: {
      customProperties: {
        variables: {
          mainColor: '#15181A',
          mainColorContrasted: '#eee',
          textColor: '#333',
          bgColor: '#ddd'
        },
      },
    },
  }),
  require('postcss-reporter')(),
  ...!config.production ? [
    require('postcss-browser-reporter')(),
  ] : [],
];
