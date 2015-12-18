var Promise = require('bluebird')
var _ = require('lodash')
var S = require('string')
var debug = require('debug')('plugin-space:search')

var agent = require('superagent-promise')(require('superagent'), Promise);


var _module = () => {
    var search = (name, max = 25) => {
        debug(`Searching for ${max} packages`);
        let url = "http://npmsearch.com/query?q=exemd&fields=name";
        return agent('GET', url).set('Accept', 'application/json').then((it) => {
            return JSON.parse(it.text);
        }).then( (data) => {
            return  _.map(data.results, r => {
                return r.name[0]
            })
        })
    }

    return {
        search: search
    }
}

module.exports = _module()

/*
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
*/
