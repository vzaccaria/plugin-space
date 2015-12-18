var Promise = require('bluebird')
var _ = require('lodash')
var debug = require('debug')('plugin-space:search')
var agent = require('superagent-promise')(require('superagent'), Promise);


var _module = () => {
    var search = (name, max = 25) => {
        debug(`Searching for ${max} packages`);
        let url = `http://npmsearch.com/query?q=${name}&fields=name`;
        return agent('GET', url).set('Accept', 'application/json').end().then((it) => {
                return JSON.parse(it.text);
            }).then((data) => {
                return _.map(data.results, r => {
                    return r.name[0]
                })
            })
            .then((data) => {
                return _.filter(data, it => {
                    return it.match(new RegExp(`^${name}-`));
                })
            })
    }

    return {
        search: search
    }
}

module.exports = _module()
