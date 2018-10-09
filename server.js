const express = require('express');
const bodyparser = require('body-parser');

const env = process.env.NODE_ENV || 'development';
const configure = require('./knexfile')[env];
const database = require('knex')(configure);

const app = express();
app.use(bodyparser.json());

const port = process.env.PORT || 3000;

