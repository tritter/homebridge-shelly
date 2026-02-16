
module.exports = homebridge => {
  const { PLATFORM_NAME, PLUGIN_NAME } = require('./constants')
  const ShellyPlatform = require('./platform')(homebridge)

  homebridge.registerPlatform(
    PLUGIN_NAME,
    PLATFORM_NAME,
    ShellyPlatform,
    true
  )
}
