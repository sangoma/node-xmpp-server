'use strict'

/* global describe, it */

var Session = require('../../../').C2S._Session
var assert = require('assert')
var sinon = require('sinon')
var Connection = require('node-xmpp-core').Connection

describe('C2S Session', function () {
  describe('stream start', function () {
    // http://xmpp.org/rfcs/rfc6120.html#streams-attr-to
    describe('to attribute', function () {
      it('sends a host-unknown error if stream "to" attribute is empty', function () {
        var conn = new Connection()
        var session = new Session({connection: conn}) // eslint-disable-line
        var error = sinon.stub(conn, 'error')
        conn.emit('streamStart', {to: ''})
        assert(error.calledOnce)
        assert(error.calledWith('host-unknown', "empty 'to' attibute"))
      })

      it('sends a host-unknown error if stream "to" is missing', function () {
        var conn = new Connection()
        var session = new Session({connection: conn}) // eslint-disable-line
        var error = sinon.stub(conn, 'error')
        conn.emit('streamStart', {})
        assert(error.calledOnce)
        assert(error.calledWith('host-unknown', "'to' attribute missing"))
      })
    })
  })
  describe('stream features', function () {
    it('contains <session xmlns="urn:ietf:params:xml:ns:xmpp-session"/> if server sendSessionFeature is true', function () {
      var session = new Session({
        server: {sendSessionFeature: true}
      })
      session.authenticated = true
      var send = sinon.spy(session, 'send')
      session.sendFeatures()
      assert(send.getCall(0).args[0].getChild('session', 'urn:ietf:params:xml:ns:xmpp-session'))
    })
    it('does not contain <session xmlns="urn:ietf:params:xml:ns:xmpp-session"/> if server sendSessionFeature is false', function () {
      var session = new Session({
        server: {sendSessionFeature: false}
      })
      session.authenticated = true
      var send = sinon.spy(session, 'send')
      session.sendFeatures()
      assert.equal(send.getCall(0).args[0].getChild('session', 'urn:ietf:params:xml:ns:xmpp-session'), undefined)
    })
  })
})
