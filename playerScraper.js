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
    const container = document.querySelector('.mw-parser-output');
    const table = container.querySelector('table');
    const body = table.querySelector('tbody');
    const rows = [...body.querySelectorAll('tr')];
    return rows.map(row => {
      const player = row.querySelector('th').querySelector('a').innerText;
      const position = row.querySelectorAll('td')[1].querySelector('a')
        .innerText;
      const age = row.querySelectorAll('td')[2].innerText;
      return { player, position, age };
    });
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
