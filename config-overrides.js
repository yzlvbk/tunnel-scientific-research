/*config-overrides.js */
const { injectBabelPlugin } = require('react-app-rewired');
const rewireCssModules = require('react-app-rewire-less-modules');

module.exports = function override(config, env) {
  //less模块化
  config = rewireCssModules(config, env);
  return config;
}