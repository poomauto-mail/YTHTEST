var env = process.env.NODE_ENV || 'development'

var config = {
  development: require('./dev.env'),
  production: require('./prod.env'),
  //staging: require('./config/staging.js')
}

module.exports = config[env]