const Nightmare = require('nightmare');
const nightmare = Nightmare({
  show: true
});
const fs = require('file-system');
const $ = require('jQuery');

nightmare
  .goto('https://en.wikipedia.org/wiki/2018_FIFA_World_Cup_squads')
  .wait(500)
  .evaluate(() => {
    const datas = $('.mw-parser-output')
      .find('h3')
      .find('.mw-headline')
      .text();

    return datas;
  })
  .end()
  .then(result => {
    fs.writeFile('./countryNames.js', JSON.stringify(result), function(err) {});
    console.log(result);
  })
  .catch(error => {
    console.error('Search failed:', error);
  });
