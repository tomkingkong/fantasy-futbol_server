const express = require('express')
const router = express.Router()
const env = process.env.NODE_ENV || 'development';
const configure = require('../../../knexfile')[env];
const database = require('knex')(configure);

router.get('/', (req, res) => {
  database('countries')
    .then(countries => res.status(200).json(countries))
    .catch(error => {
      return res.status(500).json({
        error
      });
    });
});

router.get('/:id/players', (req, res) => {
  const { id } = req.params;
  database('players')
    .where('country_id', id)
    .then(player => {
      player.length
        ? res.status(200).json(player)
        : res.status(404).send({
            error: 'team does not exist'
          });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.post('/', (req, res) => {
  const { name } = req.body;
  const country = { name };
  database('countries')
    .insert(country, 'id')
    .then(country => {
      if (!name) {
        res.status(422).json({
          msg: `Missing one or more fields`
        });
      } else {
        res.status(201).json({
          msg: `${name} was added to countries list with an id of ${country[0]}`
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error: error.message
      });
    });
});

module.exports = router