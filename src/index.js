
var $ = require('lodash')
var g = require('./lib/google.es5')
var b = require('bluebird')

var google = b.promisify(g.igoogle)

var _module = () => {
  var search = _ => {
    return google(`site:www.npmjs.com ${_}`,0)
          .then( data => {
                    data = data.links
                    data = $.filter(data, it => {
                        if($.isString(it.link)) {
                          return it.link.match(`package/${_}`)
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

_module().search("exemd").then( _ => {
  $.map(_, _ => {
      console.log(_.title);
  })
})

// module.exports = _module()
