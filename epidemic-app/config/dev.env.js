var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST:'"https://jsq.noah-dream.com:443/app/"',
  BASE_API: '"http://localhost:8083"'
})
