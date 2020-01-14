var merge = require('webpack-merge')
var prodEnv = require('./prodEnv')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ROOT_API: "http://www.google.com"
})