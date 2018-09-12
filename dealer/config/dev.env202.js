'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT:'"http://192.168.1.202:9093"',
  API_PUBLIC_ROOT:'"http://192.168.1.202:9097"'
})
