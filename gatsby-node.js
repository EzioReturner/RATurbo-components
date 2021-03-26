const path = require('path');

exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, '../src'), 'node_modules'],
      alias: {
        'turbo-components/lib': path.resolve(__dirname, '../components/'),
        'turbo-components/esm': path.resolve(__dirname, '../components/'),
        'turbo-components': path.resolve(__dirname, '../components/'),
      },
    },
  });
};
