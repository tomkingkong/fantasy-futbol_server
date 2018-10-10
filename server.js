const express = require('express');
const bodyparser = require('body-parser');
const fs = require('file-system');
const countries = require('./data/countries.js');

const env = process.env.NODE_ENV || 'development';
const configure = require('./knexfile')[env];
const database = require('knex')(configure);

const app = express();
app.use(bodyparser.json());

const port = process.env.PORT || 3000;

app.get('/', (request, response) => {
  const playersList = JSON.parse(fs.readFileSync('./data/players.json'));

  const participatingPlayers = playersList.reduce((players, player) => {
    countries.forEach(country => {
      if (country.name === player.Nationality) {
        players.push(player);
      }
    });
    return players;
  }, []);

  const keys = Object.keys(participatingPlayers[0]).map(key =>
    key.replace(/ /g, '_')
  );

  // const keys = Object.keys(playerData[0]).map(key => key.replace(/ /g, '_'));

  // let newList = [];

  // for (let player in participatingPlayers) {
  //   var newPlayers = {};

  //   for (let key in keys) {
  //     newPlayers[keys[key]] =
  //       participatingPlayers[player][
  //         Object.keys(participatingPlayers[player])[key]
  //       ];
  //   }
  //   newList.push(newPlayers);
  // }

  fs.writeFileSync('./data/goalies.json', JSON.stringify(goalies, null, 4));

  // let actualKeys = [
  //   'Name',
  //   'Age',
  //   'Nationality',
  //   'Club',
  //   'Overall',
  //   'Potential',
  //   'Value',
  //   'Wage',
  //   'Acceleration',
  //   'Aggression',
  //   'Agility',
  //   'Balance',
  //   'Composure',
  //   'Crossing',
  //   'Curve',
  //   'Dribbling',
  //   'Finishing',
  //   'Interceptions',
  //   'Jumping',
  //   'Marking',
  //   'Penalties',
  //   'Positioning',
  //   'Reactions',
  //   'Stamina',
  //   'Strength',
  //   'Vision',
  //   'Volleys',
  //   'Preferred_Positions'
  // ];

  // const players = newList.map(res => {
  //   let obj = {};
  //   actualKeys.forEach(key => {
  //     if (res[key]) {
  //       obj[key] = res[key];
  //     }
  //   });
  //   obj['Positions'] = obj.Preferred_Positions;
  //   delete obj.Preferred_Positions;
  //   return obj;
  // });

  // fs.writeFileSync(
  //   './data/goalies.json',
  //   JSON.stringify(players, null, 4),
  //   function(err) {}
  // );
});

app.get('/api/v1/countries', (request, response) => {
  database('countries')
    .then(countries => response.status(200).json(countries))
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/players', (request, response) => {
  database('players')
    .then(players => response.status(200).json(players))
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/countries/:id', (request, response) => {
  const { id } = request.params;
  database('countries')
    .where('id', id)
    .then(country => {
      country.length
        ? response.status(200).json(country)
        : reponse.status(404).send({ error: 'country does not exist' });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/players/:id', (request, response) => {
  const { id } = request.params;
  database('players')
    .where('id', id)
    .then(player => {
      player.length
        ? response.status(200).json(player)
        : response.status(404).send({ error: 'player does not exist' });
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/players/:id', (request, response) => {
  const player = request.body;
  database(user);
});

app.listen(port, () => {
  console.log('server is listening on 3000');
});
