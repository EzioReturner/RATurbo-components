const path = require('path');

exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        'raturbo-components/lib': path.resolve(__dirname, '../components/'),
        'raturbo-components/esm': path.resolve(__dirname, '../components/'),
        'raturbo-components': path.resolve(__dirname, '../components/'),
      },
    },
  });
};
