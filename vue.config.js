const webpackConfig = require('./webpack.config')

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: webpackConfig,
}