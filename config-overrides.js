/**
 * Created by san on 2019年1月13日, 0013.
 */
const {injectBabelPlugin} = require('react-app-rewired')

module.exports = function override(config, env) {
  config = injectBabelPlugin(
    ['import', {libraryName: 'antd', libraryDirectory: 'es', style: 'css'}],
    config,
  )
  return config
}
