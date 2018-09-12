'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing202"',
  API_ROOT:'"http://192.168.1.202:9092"',
  API_PUBLIC_ROOT:'"http://192.168.1.202:9097"'
})
