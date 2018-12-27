const ENV = process.env.NODE_ENV || 'development'

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(`./webpack/${ENV}.js`)
