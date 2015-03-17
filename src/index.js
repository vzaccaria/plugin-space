var $ = require('lodash')
var {
  search
} = require('./lib/search.es5')

search("exemd").then(_ => {
  $.map(_, _ => {
    console.log(_.title);
  })
})

// module.exports = _module()
