'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://192.168.1.203:9093"',
  API_ROOT_URL:'"http://192.168.1.203:9097"'
})
