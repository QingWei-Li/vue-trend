module.exports = {
  webpack (config) {
    config.resolve.alias['vuetrend'] = '../src'
    return config
  }
}
