"use strict";

var $ = require("lodash");

var _require = require("./lib/search.es5.js");

var search = _require.search;

var _require2 = require("./lib/info.es5.js");

var info = _require2.info;

var _require3 = require("./lib/print.es5.js");

var tablify = _require3.tablify;
var header = _require3.header;

var _module = function () {

  var printAll = function (_) {
    header();
    return search(_, 25).map(info).map(tablify);
  };

  return {
    printAll: printAll
  };
};

module.exports = _module();
