const express = require('express')
const router = express.Router()
const env = process.env.NODE_ENV || 'development';
const configure = require('../../../knexfile')[env];
const database = require('knex')(configure);

router.get('/', (request, response) => {
  database('countries')
    .then(countries => response.status(200).json(countries))
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

router.get('/:id/players', (request, response) => {
  const { id } = request.params;
  database('players')
    .where('country_id', id)
    .then(player => {
      player.length
        ? response.status(200).json(player)
        : response.status(404).send({
            error: 'team does not exist'
          });
    })
    .catch(error => {
      response.status(500).json({
        error
      });
    });
});

router.post('/', (request, response) => {
  const { name } = request.body;
  const country = { name };
  database('countries')
    .insert(country, 'id')
    .then(country => {
      if (!name) {
        response.status(422).json({
          msg: `Missing one or more fields`
        });
      } else {
        response.status(201).json({
          msg: `${name} was added to countries list with an id of ${country[0]}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({
        error: error.message
      });
    });
});

module.exports = router