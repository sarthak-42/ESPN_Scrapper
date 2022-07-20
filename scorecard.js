const request = require('request');
const cheerio = require('cheerio');
// const url =
//   'https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard';

function processscorecard(url) {
  request(url, cb);
}
function cb(error, response, html) {
  if (error) {
    console.log('Error');
  } else {
    extractMatchDetails(html);
  }
}

function extractMatchDetails(html) {
  let $ = cheerio.load(html);
  let descElem = $('.match-header-info.match-info-MATCH .description');
  let result = $('.event .status-text').text();
  let strArr = descElem.text().split(',');
  let venue = strArr[1].trim();
  let date = strArr[2].trim();
  let innings = $('.card.content-block.match-scorecard-table>.Collapsible');
  // let htmlStr = '';
  for (let i = 0; i < innings.length; i++) {
    // htmlStr += $(innings[i]).html();
    let teamName = $(innings[i]).find('h5').text();
    teamName = teamName.split('INNINGS')[0].trim();
    let opponentIndex = i == 0 ? 1 : 0;
    let opponentName = $(innings[opponentIndex]).find('h5').text();
    opponentName = opponentName.split('INNINGS')[0].trim();
    let cinnings = $(innings[i]);
    let allRows = cinnings.find('.table.batsman tbody tr');
    for (let j = 0; j < allRows.length; j++) {
      let allcols = $(allRows[j]).find('td');
      let isworthy = $(allcols[0]).hasClass('batsman-cell');
      if (isworthy == true) {
        let playerName = $(allcols[0]).text().trim();
        let runs = $(allcols[2]).text().trim();
        let balls = $(allcols[3]).text().trim();
        let fours = $(allcols[5]).text().trim();
        let sixes = $(allcols[6]).text().trim();
        let sr = $(allcols[7]).text().trim();

        console.log(`${playerName} ${runs} ${balls} ${fours} ${sixes} ${sr}`);
      }
    }
  }
  console.log(`--------------------------------`);
}
module.exports = {
  ps: processscorecard,
};
