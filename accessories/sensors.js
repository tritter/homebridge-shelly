
module.exports = homebridge => {
  const Accessory = homebridge.hap.Accessory
  const BatteryAbility = require('../abilities/battery')(homebridge)
  const ContactSensorAbility =
    require('../abilities/contact-sensor')(homebridge)
  const HumiditySensorAbility =
    require('../abilities/humidity-sensor')(homebridge)
  const LeakSensorAbility = require('../abilities/leak-sensor')(homebridge)
  const LightSensorAbility = require('../abilities/light-sensor')(homebridge)
  const MotionSensorAbility = require('../abilities/motion-sensor')(homebridge)
  const OccupancySensorAbility =
    require('../abilities/occupancy-sensor')(homebridge)
  const PowerMeterAbility =
    require('../abilities/power-meter')(homebridge)
  const SmokeSensorAbility = require('../abilities/smoke-sensor')(homebridge)
  const TemperatureSensorAbility =
    require('../abilities/temperature-sensor')(homebridge)
  const TiltSensorAbility = require('../abilities/tilt-sensor')(homebridge)
  const { ShellyAccessory } = require('./base')(homebridge)

  class ShellySensorAccessory extends ShellyAccessory {
    constructor(device, index, config, log, abilities = null) {
      super('sensor', device, index, config, log, abilities)
    }

    get category() {
      return Accessory.Categories.SENSOR
    }
  }

  class ShellyDoorWindowAccessory extends ShellySensorAccessory {
    constructor(device, index, config, log) {
      super(device, index, config, log, [
        new ContactSensorAbility('state'),
        new LightSensorAbility('illuminance'),
        new MotionSensorAbility('vibration'),
        new TiltSensorAbility('tilt'),
        new BatteryAbility('battery'),
      ])
    }
  }

  class ShellyDoorWindow2Accessory extends ShellySensorAccessory {
    constructor(device, index, config, log) {
      super(device, index, config, log, [
        new ContactSensorAbility('state'),
        new LightSensorAbility('illuminance'),
        new MotionSensorAbility('vibration'),
        new TiltSensorAbility('tilt'),
        new TemperatureSensorAbility('temperature'),
        new BatteryAbility('battery')
      ])
    }
  }

  class ShellyFloodAccessory extends ShellySensorAccessory {
    constructor(device, index, config, log) {
      super(device, index, config, log, [
        new LeakSensorAbility('flood'),
        new TemperatureSensorAbility('temperature'),
        new BatteryAbility('battery'),
      ])
    }
  }

  class ShellyGasSmokeSensorAccessory extends ShellySensorAccessory {
    constructor(device, index, config, log) {
      super(device, index, config, log, [
        new SmokeSensorAbility({
          name: 'gas',
          getter: function() {
            return this.gas !== 'unknown' && this.gas !== 'none'
          },
        })
      ])
    }
  }

  class ShellyHTAccessory extends ShellySensorAccessory {
    constructor(device, index, config, log) {
      super(device, index, config, log, [
        new TemperatureSensorAbility('temperature'),
        new HumiditySensorAbility('humidity'),
        new BatteryAbility('battery', false, null, -1),
      ])
    }
  }

  class ShellyRelayContactSensorAccessory extends ShellyAccessory {
    constructor(device, index, config, log, powerMeterIndex = false) {
      super('contactSensor', device, index, config, log)

      this.abilities.push(new ContactSensorAbility('relay' + index))

      if (powerMeterIndex !== false) {
        this.abilities.push(new PowerMeterAbility('power' + powerMeterIndex))
      }
    }

    get category() {
      return Accessory.Categories.SENSOR
    }
  }

  class ShellyRelayMotionSensorAccessory extends ShellyAccessory {
    constructor(device, index, config, log, powerMeterIndex = false) {
      super('motionSensor', device, index, config, log)

      this.abilities.push(new MotionSensorAbility('relay' + index))

      if (powerMeterIndex !== false) {
        this.abilities.push(new PowerMeterAbility('power' + powerMeterIndex))
      }
    }

    get category() {
      return Accessory.Categories.SENSOR
    }
  }

  class ShellyRelayOccupancySensorAccessory extends ShellyAccessory {
    constructor(device, index, config, log, powerMeterIndex = false) {
      super('occupancySensor', device, index, config, log)

      this.abilities.push(new OccupancySensorAbility('relay' + index))

      if (powerMeterIndex !== false) {
        this.abilities.push(new PowerMeterAbility('power' + powerMeterIndex))
      }
    }

    get category() {
      return Accessory.Categories.SENSOR
    }
  }

  class ShellySenseAccessory extends ShellySensorAccessory {
    constructor(device, index, config, log) {
      super(device, index, config, log, [
        new MotionSensorAbility('motion'),
        new TemperatureSensorAbility('temperature'),
        new HumiditySensorAbility('humidity'),
        new LightSensorAbility('illuminance'),
        new BatteryAbility('battery', true, 'charging'),
      ])
    }
  }

  class ShellyMotionAccessory extends ShellySensorAccessory {
    constructor(device, index, config, log) {
      super(device, index, config, log, [
        new MotionSensorAbility('motion'),
        new LightSensorAbility('illuminance'),
        new BatteryAbility('battery'),
      ])
    }
  }

  class ShellyTemperatureAddOnAccessory extends ShellySensorAccessory {
    constructor(device, index, sensorIndex, config, log) {
      const abilities = [
        new TemperatureSensorAbility('externalTemperature' + sensorIndex)
      ]
      const humitiyEnabled = sensorIndex === 0 && config.humidity
      if (humitiyEnabled) {
        abilities.push(new HumiditySensorAbility('externalHumidity'))
      }
      if (config.humidity && sensorIndex !== 0) {
        throw new Error(`Invalid config, 
          humidity can only work with one DHT22 sensor connected`)
      }
      super(device, index, config, log, abilities)
    }
  }

  return {
    ShellyDoorWindowAccessory,
    ShellyDoorWindow2Accessory,
    ShellyFloodAccessory,
    ShellyGasSmokeSensorAccessory,
    ShellyHTAccessory,
    ShellyRelayContactSensorAccessory,
    ShellyRelayMotionSensorAccessory,
    ShellyRelayOccupancySensorAccessory,
    ShellySenseAccessory,
    ShellyMotionAccessory,
    ShellyTemperatureAddOnAccessory
  }
}
