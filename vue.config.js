const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: 'http://ec2-35-171-243-24.compute-1.amazonaws.com:800'
  }
}