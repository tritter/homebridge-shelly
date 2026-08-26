
module.exports = homebridge => {
  const Categories = homebridge.hap.Categories
  const { ShellyRelayAccessory } = require('./base')(homebridge)
  const ValveAbility = require('../abilities/valve')(homebridge)

  class ShellyRelayValveAccessory extends ShellyRelayAccessory {
    constructor(device, index, config, log, powerMeterIndex = false) {
      super('valve', device, index, config, log)

      const consumptionProperty = powerMeterIndex !== false
        ? 'power' + powerMeterIndex
        : null

      this.abilities.push(new ValveAbility(
        'relay' + index,
        this.setRelay.bind(this),
        consumptionProperty
      ))

      if (consumptionProperty) {
        this.addPowerMeter(consumptionProperty)
      }
    }

    get category() {
      return Categories.FAUCET
    }
  }

  return {
    ShellyRelayValveAccessory,
  }
}
