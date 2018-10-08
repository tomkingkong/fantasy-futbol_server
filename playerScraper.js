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
    let players = $('.mw-parser-output')
      .find('table')
      .children('tbody')
      .find('th')
      .children('a')
      .text();
    return players;
  })
  .end()
  .then(result => {
    fs.writeFile(
      './playerStats.json',
      JSON.stringify(result, null, 4),
      function(err) {}
    );
    console.log(result);
  })
  .catch(error => {
    console.error('Search failed:', error);
  });
