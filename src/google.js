var request = require('request'),
  cheerio = require('cheerio'),
  fs = require('fs'),
  querystring = require('querystring'),
  util = require('util');


var linkSel = 'h3.r a',
  descSel = 'div.s',
  itemSel = 'li.g',
  nextSel = 'td.b a span';

var URL = 'http://www.google.%s/search?hl=%s&q=%s&start=%s&sa=N&num=%s&ie=UTF-8&oe=UTF-8';

function google(query, callback) {
  igoogle(query, 0, callback);
}

google.resultsPerPage = 10;
google.tld = 'com';
google.lang = 'en';
google.proxy = null;

var igoogle = function(query, start, callback) {
  if (google.resultsPerPage > 100) google.resultsPerPage = 100; //Google won't allow greater than 100 anyway

  var newUrl = util.format(URL, google.tld, google.lang, querystring.escape(query), start, google.resultsPerPage),
    requestOptions = {
      url: newUrl,
      method: 'GET'
    };

  //make sure we have a set proxy for the scrape
  if (google.proxy != null) {
    //set request.proxy to the provided google.proxy
    requestOptions.proxy = google.proxy;
  }

  request(requestOptions, function(err, resp, body) {
    if ((err == null) && resp.statusCode === 200) {
      var $ = cheerio.load(body),
        links = [],
        text = [];

      $(itemSel).each(function(i, elem) {
        var linkElem = $(elem).find(linkSel),
          descElem = $(elem).find(descSel),
          item = {
            title: $(linkElem).first().text(),
            link: null,
            description: null,
            href: null
          },
          qsObj = querystring.parse($(linkElem).attr('href'));

        if (qsObj['/url?q']) {
          item.link = qsObj['/url?q']
          item.href = item.link
        }

        $(descElem).find('div').remove();
        item.description = $(descElem).text();

        links.push(item);
      });

      var nextStart = null;
      if ($(nextSel).last().text() === 'Next') {
        nextStart = start + google.resultsPerPage
      }
      callback(null, { next: nextStart, links: links } );
    } else {
      callback(new Error('Error on response' + (resp ? ' (' + resp.statusCode + ')' : '') + ':' + err + " : " + body), null);
    }
  });
}

google.igoogle = igoogle;

module.exports = google;
