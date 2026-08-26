
module.exports = homebridge => {
  const Categories = homebridge.hap.Categories
  const SwitchAbility = require('../abilities/switch')(homebridge)
  const { ShellyRelayAccessory } = require('./base')(homebridge)

  class ShellyRelaySwitchAccessory extends ShellyRelayAccessory {
    constructor(device, index, config, log, powerMeterIndex = false) {
      super('switch', device, index, config, log)

      this.abilities.push(new SwitchAbility(
        'relay' + index,
        this.setRelay.bind(this)
      ))

      if (powerMeterIndex !== false) {
        this.addPowerMeter('power' + powerMeterIndex)
      }
    }

    get category() {
      return Categories.SWITCH
    }
  }

  return {
    ShellyRelaySwitchAccessory,
  }
}
