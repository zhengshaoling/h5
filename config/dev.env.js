'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"/api/dmd"',
  UPLOADS_URL:'"/uploads/ufa"',
  URL:'"/"',
  EDITOE_URL:'"/static/UEditor/"'
});
