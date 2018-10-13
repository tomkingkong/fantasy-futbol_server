const express = require('express');
const bodyParser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const configure = require('./knexfile')[env];
const database = require('knex')(configure);

const users = require('./routes/api/v1/users');
const countries = require('./routes/api/v1/countries');
const players = require('./routes/api/v1/players');

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const port = process.env.PORT || 3000;

app.use('/api/v1/users', users);
app.use('/api/v1/countries', countries);
app.use('/api/v1/players', players);

app.listen(port, () => {
  console.log('server is listening on 3000');
});

module.exports = { app, database };
