/* eslint-env mocha */

const Homebridge = require('./mocks/homebridge')

const homebridge = new Homebridge()

const {
  ConsumptionCharacteristic
} = require('../util/custom-characteristics')(homebridge)

describe('ConsumptionCharacteristic', function() {
  describe('#constructor()', function() {
    it('should set a name and UUID', function() {
      const char = new ConsumptionCharacteristic()
      char.displayName.should.be.ok()
      char.UUID.should.be.ok()
    })

    it('should set its properties', function() {
      const char = new ConsumptionCharacteristic()
      char.props.should.be.ok()
      char.props.format.should.be.ok()
      char.props.perms.should.be.ok()
    })
  })
})

describe('custom characteristics (Homebridge 2.x hap shape)', function() {
  it('should work when Formats/Perms are only on hap namespace', function() {
    const EventEmitter = require('events')

    class Characteristic extends EventEmitter {
      constructor(displayName, UUID) {
        super()
        this.displayName = displayName
        this.UUID = UUID
        this.props = {}
      }

      setProps(props) {
        this.props = props
        return this
      }

      getDefaultValue() {
        return 0
      }
    }

    const homebridge = {
      hap: {
        Characteristic,
        Formats: { FLOAT: 'float' },
        Perms: { READ: 'pr', NOTIFY: 'pn' },
      },
    }

    const { ConsumptionCharacteristic } =
      require('../util/custom-characteristics')(homebridge)

    const char = new ConsumptionCharacteristic()
    char.props.format.should.equal('float')
    char.props.perms.should.containEql('pr')
  })
})
