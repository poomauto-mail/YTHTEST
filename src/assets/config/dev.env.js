var merge = require('webpack-merge')
var prodEnv = require('./prodEnv')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ROOT_API: "http://172.20.36.59:8000/api"
})