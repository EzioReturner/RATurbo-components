const path = require('path')

exports.onCreateWebpackConfig = args => {
  args.actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, '..'), 'node_modules'],
      alias: {
        'mc-ui/lib': path.resolve(__dirname, '../components/'),
        'mc-ui': path.resolve(__dirname, '../src'),
      },
    },
  })
}
