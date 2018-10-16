const express = require('express');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const configure = require('../../../knexfile')[env];
const database = require('knex')(configure);
const cors = require('cors')

router.get('/', (request, response) => {
  database('users')
    .then(users => response.status(200).json(users))
    .catch(error => {
      response.status(500).json({
        error
      });
    });
});

router.get('/:id', (request, response) => {
  const userID = request.params.id;
  database('users')
    .where('id', userID)
    .then(user => response.status(200).json(user))
    .catch(error => {
      response.status(500).json({
        error
      });
    });
});

router.post('/', (request, response) => {
  const { username, password } = request.body;
  const user = { username, password };
  database('users')
    .insert(user, 'id')
    .then(user => {
      !username
        ? response.status(422).json({
            msg: `Missing one or more fields`
          })
        : response.status(201).json({
            msg: `Username: ${username} was created with id of ${user[0]}`
          });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.put('/:id/:player/players/:player_id', (req, res) => {
  const userPosition = `player_id_${req.params.player}`;
  if (req.params.player === 0 || req.params.player > 12) {
    return res.status(422).json({
      msg: `Users player_id_${req.params.player} does not exist`
    });
  }
  database('players')
    .where('id', req.params.player_id)
    .then(player => {
      database('users')
        .where('id', req.params.id)
        .update({ [userPosition]: player[0].id })
        .then(() => {
          if (req.params.player > 0 && req.params.player < 13) {
            res.status(201).json({
              msg: `${userPosition} was edited`
            });
          }
        });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.put('/:id', (req, res) => {
  const { username, password } = req.body;
  database('users')
    .where('id', req.params.id)
    .update({ username, password })
    .then(() => {
      if (username && password) {
        res.status(202).json({
          msg: `edited user {username: ${req.body.username}, password: ${
            req.body.password
          }}`
        });
      }
    })
    .catch(error => {
      if (!username || !password) {
        res.status(422).json({
          error: 'Incorrect fields'
        });
      } else {
        res.status(500).json({
          error
        });
      }
    });
});

router.delete('/:id', (req, res) => {
  database('users')
    .where('id', req.params.id)
    .del()
    .then(result => {
      if (result) {
        res.status(202).json({
          msg: 'user successfully deleted'
        });
      } else {
        res.status(422).json({
          error: 'user does not exist'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

module.exports = router;
