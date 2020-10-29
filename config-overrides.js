/*config-overrides.js */
const { injectBabelPlugin } = require('react-app-rewired');
const rewireCssModules = require('react-app-rewire-css-modules')
// const rewireLessModules = require('react-app-rewire-less-modules')
const rewireLess = require('react-app-rewire-less-modules')
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = function override(config, env) {

  //启用ES7的修改器语法（babel 7）
  config = injectBabelPlugin(['@babel/plugin-proposal-decorators', { "legacy": true }], config)   //{ "legacy": true }一定不能掉，否则报错

  //配置别名，设置@指向src目录
  config.resolve.alias = {
    '@': resolve('src')
  }

  //css模块化
  config = rewireCssModules(config, env);

  //less模块化
  // config = rewireLessModules(config, env);
  //less模块化
  config = rewireLess(config, env)
  return config;
}