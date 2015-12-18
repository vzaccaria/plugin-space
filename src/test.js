var chai = require('chai')
chai.use(require('chai-as-promised'))
var should = chai.should()

/*global describe, it, before, beforeEach, after, afterEach */

describe('#module', () => {
    "use strict"
    it('should load the module', () => {

        var mod = require('..');
        should.exist(mod);

    })
    it('should get an array', () => {
        var mod = require('..');
        return mod.search('exemd').should.eventually.be.an("array");
    })
    it('the array should contain valid values', () => {
        var mod = require('..');
        return mod.search('exemd').should.eventually.contain("exemd");
    })
})
