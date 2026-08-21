
module.exports = homebridge => {
  const Categories = homebridge.hap.Categories
  const DoorAbility = require('../abilities/door')(homebridge)
  const { ShellyAccessory } = require('./base')(homebridge)

  class Shelly2DoorAccessory extends ShellyAccessory {
    constructor(device, index, config, log) {
      super('door', device, index, config, log)

      this.abilities.push(new DoorAbility(
        'rollerPosition',
        'rollerState',
        this.setPosition.bind(this)
      ))
    }

    get category() {
      return Categories.DOOR
    }

    /**
     * Sets the current position to the new value.
     * @returns {Promise} A Promise that resolves when the position has been
     * updated.
     */
    setPosition(newValue) {
      return this.device.setRollerPosition(newValue)
    }
  }

  return {
    Shelly2DoorAccessory,
  }
}
