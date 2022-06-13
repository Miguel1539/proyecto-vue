const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  transpileDependencies: ['vuetify'],
  // devServer: {
  //   proxy: 'http://projectdaw.duckdns.org:3377/'
  // }
  devServer: {
    port: 3377,
    proxy: 'http://projectdaw.duckdns.org:3377/'
  }
})
