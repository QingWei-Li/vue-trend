var resolve = require('path').resolve
module.exports = {
  html: {
    template: resolve(__dirname, './template.tpl')
  },
  webpack: function (webpackConfig) {
    webpackConfig.output.publicPath = '/vue-trend/'

    return webpackConfig
  }
}
