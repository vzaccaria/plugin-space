var g = require('./lib/google.es5')
var b = require('bluebird')
var _ = require('lodash')

var google = b.promisify(g.igoogle)

var _module = () => {
  var search = (name, max) => {
    var rng = _.range(0, max, 25)
    b.all(_.map(rng, (start) => {
        google(`site:www.npmjs.com ${name}`, start)
      }))
      .then(data => {
        data = _.flatten(data)
        data = data.links
        data = $.filter(data, it => {
          if ($.isString(it.link)) {
            return it.link.match(`package/${pack}`)
          } else {
            return null
          }
        })
        return data
      })
  }
  return {
    search: search
  }
}
