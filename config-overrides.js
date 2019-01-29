/**
 * Created by san on 2019年1月13日, 0013.
 */
const rewireLess = require('react-app-rewire-less')
const {injectBabelPlugin} = require('react-app-rewired');

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}],
    config,
  );

  config = rewireLess.withLoaderOptions({
    modifyVars: {"@primary-color": "#2ea573"},
    javascriptEnabled: true,
  })(config, env);

  return config;
};
