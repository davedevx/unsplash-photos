/* eslint no-param-reassign: 0 */

const { injectBabelPlugin } = require('react-app-rewired')
const rewireLess = require('react-app-rewire-less')

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }], config)
  config = rewireLess.withLoaderOptions({
    modifyVars: {
      '@font-size-base': '1em',
    },
    javascriptEnabled: true,
  })(config, env)

  return config
}
