
module.exports = homebridge => {
  const Categories = homebridge.hap.Categories
  const OutletAbility = require('../abilities/outlet')(homebridge)
  const { ShellyRelayAccessory } = require('./base')(homebridge)

  class ShellyRelayOutletAccessory extends ShellyRelayAccessory {
    constructor(device, index, config, log, powerMeterIndex = false) {
      super('outlet', device, index, config, log)

      const consumptionProperty = powerMeterIndex !== false
        ? 'power' + powerMeterIndex
        : null

      this.abilities.push(new OutletAbility(
        'relay' + index,
        this.setRelay.bind(this),
        consumptionProperty
      ))

      if (consumptionProperty) {
        this.addPowerMeter(consumptionProperty)
      }
    }

    get category() {
      return Categories.OUTLET
    }
  }

  return {
    ShellyRelayOutletAccessory,
  }
}
