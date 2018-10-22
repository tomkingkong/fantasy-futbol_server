const express = require('express');
const router = express.Router();
const env = process.env.NODE_ENV || 'development';
const configure = require('../../../knexfile')[env];
const database = require('knex')(configure);
const cors = require('cors')

router.get('/', (req, res) => {
  database('users')
    .then(users => res.status(200).json(users))
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.get('/:id', (req, res) => {
  const userID = req.params.id;
  database('users')
    .where('id', userID)
    .then(user => res.status(200).json(user))
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  database('users')
    .insert(user, 'id')
    .then(user => {
      !username
        ? res.status(422).json({
            msg: `Missing one or more fields`
          })
        : res.status(201).json({
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
							msg: `${userPosition} was edited`,
							player: player
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
  const { username, password, newPass, newName } = req.body;
  database('users')
    .where('id', req.params.id)
    .then(user => {
      if(!user) {
        res.status(422).json({
          error: 'Incorrect fields'
        });
      } else {
        if (username !== user[0].username || password !== user[0].password) {
          return res.status(422).json({
            error: 'Incorrect fields'
          });
        } else {
          database('users')
            .where('id', req.params.id)
            .update({ username:newName, password:newPass })
            .then(() => {
              res.status(202).json({
                msg: `Edited user {username: ${newName}, password: ${newPass}}`
              });
            })
        }
      }
    })
    .catch(error => {
        res.status(500).json({
          error
        });
      })
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
