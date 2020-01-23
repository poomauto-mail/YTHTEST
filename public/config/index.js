var path = require('path')

module.exports = {
  dev: {
    env: require('./dev.env'),
    port: 8080,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    cssSourceMap: false
  },
  bundle: {
    env: require('./prod.env'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsPublicPath: '/'
  },
//   docs: {
//     env: require('./prod.env'),
//     index: path.resolve(__dirname, '../gh-pages/index.html'),
//     assetsRoot: path.resolve(__dirname, '../gh-pages'),
//     assetsPublicPath: '',
//     assetsSubDirectory: 'static',
//     productionSourceMap: true
//   },
}