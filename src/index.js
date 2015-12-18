var $ = require('lodash')

 var {
   search
} = require('./lib/search.js')

var {
  info
} = require('./lib/info.js')

var {
   tablify, header
} = require('./lib/print.js')



var _module = () => {

    var printAll = _ => {
        header()
        return search(_).then( (it) => {
            return $.map(it, info);
        }).map(tablify);
    }

  return {
      printAll, search
  }
}

module.exports = _module()
