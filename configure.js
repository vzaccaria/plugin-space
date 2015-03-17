var {
  generateProject
} = require('diy-build')



generateProject(_ => {

  _.babel = (src, ...deps) => {
    var command = (_) => `./node_modules/.bin/babel ${_.source} -o ${_.product}`
    var product = (_) => `${_.source.replace(/\..*/, '.es5.js')}`
    _.compileFiles(...([command, product, src].concat(deps)))
  }

  _.collectSeq("all", _ => {
    _.collect("build", _ => {

        _.mirrorTo("lib", {
          strip: "src"
        }, _ => {
          _.babel("src/*.js")
        })

        _.toFile("./index.js", _ => {
          _.babel("src/index.js")
        })

      })
      // _.cmd("node ./index.js")
  })

  _.collectSeq("update", _ => {
    _.cmd("make clean")
    _.cmd("./node_modules/.bin/babel configure.js | node")
  })

})
