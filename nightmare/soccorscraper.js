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
    let countryNames = $('.mw-parser-output')
      .children('h3')
      .find('.mw-headline')
      .text()
      .split(/(?=[A-Z])/)
      .map(title => {
        return { country: title };
      });
    return countryNames;
  })
  .end()
  .then(result => {
    fs.writeFile(
      './countryNames.json',
      JSON.stringify(result, null, 4),
      function(err) {}
    );
    console.log(result);
  })
  .catch(error => {
    console.error('Search failed:', error);
  });
