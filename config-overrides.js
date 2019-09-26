const rewireReactHotLoader = require('react-app-rewire-hot-loader')

/* config-overrides.js */
module.exports = function override (config, env) {

  config.module.rules.push({
    test: /\.jsx?$/,
    include: /node_modules/,
    use: ['react-hot-loader/webpack'],
  })

  config = rewireReactHotLoader(config, env)
  return config
}
