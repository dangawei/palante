'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT:'"http://api.admin.qcchuxing.com"',
  // API_PUBLIC_ROOT:'"http://api.public.qcchuxing.com"'
  API_ROOT:'"http://192.168.1.203:9092"',
  API_PUBLIC_ROOT:'"http://192.168.1.203:9097"'
})
