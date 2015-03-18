var S = require('shelljs')
var promise = require('bluebird')

var _module = () => {

  var info = _ => {
    return new promise((resolve, reject) => {
        S.exec(`npm info ${_} --json`, {silent: true}, (code, output) => {
          if(code) {
            reject(`Error code ${code}`)
          } else {
            var data = JSON.parse(output)
            resolve(data)
          }
        })
    })
  }

  return {
    info: info
  }
}

module.exports = _module()
