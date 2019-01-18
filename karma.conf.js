module.exports = function (config) {

  var webpackConfig = require('./webpack.config.js');

  config.set({
    basePath: '',
    frameworks: ['mocha'],
    files: [
      'test/main.js',
      'test/**/*.test.js',
    ],

    preprocessors: {
      'test/main.js': [ 'webpack', 'sourcemap' ],
      'test/**/*.test.js': [ 'webpack', 'sourcemap' ],
    },

    reporters: ['progress'],

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    browsers: ['FirefoxHeadless'],

    singleRun: true,

    webpack: {
      devtool: 'inline-source-map',
      resolve: webpackConfig.resolve,
      module: webpackConfig.module
    },

    webpackMiddleware: {
      noInfo: true
    },

    reporters: ['mocha']
  })
}
