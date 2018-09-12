'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://192.168.1.203:9093"',
  API_ROOT_URL:'"http://192.168.1.203:9097"'
})
