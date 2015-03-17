"use strict";

var $ = require("lodash");

var _require = require("./lib/search.es5");

var search = _require.search;

search("exemd").then(function (_) {
  $.map(_, function (_) {
    console.log(_.title);
  });
});

// module.exports = _module()
