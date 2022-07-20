const request = require('request');
const cheerio = require('cheerio');
const scorecardobj = require('./scorecard');
const scorecard = require('./scorecard');

function getAllMatchesLink(url) {
  request(url, function (error, response, html) {
    if (error) {
      console.log('error');
    } else {
      extractAllLink(html);
    }
  });
}
function extractAllLink(html) {
  let $ = cheerio.load(html);
  let scorecardElem = $("a[data-hover='Scorecard']");
  for (let i = 0; i < scorecardElem.length; i++) {
    let link = $(scorecardElem[i]).attr('href');
    let fullLink = 'https://www.espncricinfo.com' + link;
    // console.log(fullLink);
    scorecard.ps(fullLink);
  }
}

module.exports = {
  gAlmatches: getAllMatchesLink,
};
