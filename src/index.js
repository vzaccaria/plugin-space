var $ = require('lodash')

var {
  search
} = require('./lib/search.es5.js')

var {
  info
} = require('./lib/info.es5.js')

var {
  tablify, header
} = require('./lib/print.es5.js')



var _module = () => {

  var printAll = _ => {
    header()
    return search(_, 25).map(info).map(tablify)
  }

  return {
    printAll: printAll
  }
}

module.exports = _module()
