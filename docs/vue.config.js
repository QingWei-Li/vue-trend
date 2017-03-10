var resolve = require('path').resolve
module.exports = {
  html: {
    template: resolve(__dirname, './template.tpl')
  },
  webpack: function (webpackConfig, options) {
    if (options.production) {
      webpackConfig.output.publicPath = '/vue-trend-component/'
    }

    return webpackConfig
  }
}
