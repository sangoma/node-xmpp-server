'use strict'

/* global describe, it */

var assert = require('assert')
var Server = require('../../../lib/Server')
var C2SServer = require('../../../lib/C2S/Server')
var C2SSession = require('../../../lib/C2S/Session')

describe('C2S Server', function () {
  it('is an instance of Server', function () {
    var s = new C2SServer()
    assert(s instanceof Server)
  })
  it('has an availableSaslMechanisms array property', function () {
    var s = new C2SServer()
    assert(Array.isArray(s.availableSaslMechanisms))
  })
  it('sets rejectUnauthorized to true if requestCert is true', function () {
    var s = new C2SServer({requestCert: true})
    assert.equal(s.options.rejectUnauthorized, true)
  })
  it('has C2S Session as default session', function () {
    assert.equal(C2SServer.prototype.Session, C2SSession)
  })
  it('defaults sendSessionFeature to true', function () {
    var s = new C2SServer()
    assert.strictEqual(s.sendSessionFeature, true)
    s = new C2SServer({})
    assert.strictEqual(s.sendSessionFeature, true)
  })
  it('sets sendSessionFeature property from option', function () {
    var s = new C2SServer({sendSessionFeature: true})
    assert.strictEqual(s.sendSessionFeature, true)
    s = new C2SServer({sendSessionFeature: false})
    assert.strictEqual(s.sendSessionFeature, false)
  })
})
