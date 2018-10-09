const express = require('express');
const bodyparser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const configure = require('./knexfile')[env];
const database = require('knex')(configure);

const app = express();
app.use(bodyparser.json());

const port = process.env.PORT || 3000;

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
    .catch(err => {
      response.status(500).json({ err });
    });
});

app.listen(port, () => {
  console.log('server is listening on 3000');
});
