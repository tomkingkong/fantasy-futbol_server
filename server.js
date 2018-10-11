const express = require('express');
const bodyParser = require('body-parser');
const fs = require('file-system');

const env = process.env.NODE_ENV || 'development';
const configure = require('./knexfile')[env];
const database = require('knex')(configure);

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const port = process.env.PORT || 3000;

app.get('/api/v1/countries', (request, response) => {
  database('countries')
    .then(countries => response.status(200).json(countries))
    .catch(error => {
      return response.status(500).json({
        error
      });
    });
});

app.get('/api/v1/players', (request, response) => {
  database('players')
    .then(players => response.status(200).json(players))
    .catch(error => {
      response.status(500).json({
        error
      });
    });
});

app.get('/api/v1/players/:id', (request, response) => {
  const { id } = request.params;
  database('players')
    .where('id', id)
    .then(player => {
      player.length
        ? response.status(200).json(player)
        : reponse.status(404).send({
            error: 'player does not exist'
          });
    })
    .catch(error => {
      response.status(500).json({
        error
      });
    });
});

app.get('/api/v1/country/:id/players', (request, response) => {
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

app.get('/api/v1/users', (request, response) => {
  database('users')
    .then(users => response.status(200).json(users))
    .catch(error => {
      response.status(500).json({
        error
      });
    });
});

app.get('/api/v1/users/:id', (request, response) => {
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

app.post('/api/v1/users', (request, response) => {
  const { username, password } = request.body;
  const user = { username, password };
  database('users')
    .insert(user, 'id')
    .then(user => {
      username || password
        ? response.status(201).json({
            msg: `Username: ${username} was created with id of ${user[0]}`
          })
        : response.status(422).json({
            msg: `Missing one or more fields`
          });
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

app.post('/api/v1/countries', (request, response) => {
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

app.put('/api/v1/users/:id/:player/players/:player_id', (req, res) => {
  const userPosition = `player_id_${req.params.player}`;
  database('players')
    .where('id', req.params.player_id)
    .then(player => {
      if (req.params.player === 0 || req.params.player > 12) {
        res.status(422).json({
          msg: `Users player_id_${req.params.player} does not exist`
        });
      }
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

app.put('/api/v1/users/:id', (req, res) => {
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

app.delete('/api/v1/users/:id', (req, res) => {
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

app.delete('/api/v1/players/:id', (req, res) => {
  database('players')
    .where('id', req.params.id)
    .del()
    .then(result => {
      if (result) {
        res.status(202).json({
          msg: 'player successfully deleted'
        });
      } else {
        res.status(422).json({
          error: 'player does not exist'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        error
      });
    });
});

app.listen(port, () => {
  console.log('server is listening on 3000');
});

module.exports = { app, database };
