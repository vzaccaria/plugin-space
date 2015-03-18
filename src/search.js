var g = require('./google.es5.js')
var b = require('bluebird')
var _ = require('lodash')
var S = require('string')
var debug = require('debug')('plugin-space:search')

var google = b.promisify(g.igoogle)

var _module = () => {
  var search = (name, max = 25) => {
    debug(`Searching for ${max} packages`)
    var rng = _.range(0, max, 25)
    return b.all(_.map(rng, (start) => {
        debug(`site:www.npmjs.com ${name} - ${start}`)
        return google(`site:www.npmjs.com ${name}`, start)
      }))
      .then(
        data => {
          data = _.map(data, $ => $.links)
          data = _.flatten(data)
          data = _.filter(data, it => {
            if (_.isString(it.link)) {
              return it.link.match(`package/${name}-`)
            } else {
              return null
            }
          })
          data = _.map(data, $ => S($.link).strip("https://www.npmjs.com/package/").s)
          return data
        })
  }

  return {
    search: search
  }
}

module.exports = _module()
