const express = require('express');
const bodyparser = require('body-parser');
const fs = require('file-system');

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
			response.status(500).json({
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
	const userID = request.params.id
	database('users')
		.where('id', userID)
		.then((user) => response.status(200).json(user))
		.catch(error => {
			response.status(500).json({
				error
			});
		});
});

app.post('/api/v1/users', (request, response) => {
	const {username, password} = request.body
	const user = {username, password}
	database('users').insert(user, 'id')
		.then(user => {
			response.status(201).json({
				id: user[0]
			})
		})
		.catch(error => {
			res.status(500).json({
				error
			})
		})
})

app.get('/api/v1/players/:id', (request, response) => {
	const {
		id
	} = request.params;
	database('players')
		.where('id', id)
		.then(player => {
			player.length ?
				response.status(200).json(player) :
				reponse.status(404).send({
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
	const {
		id
	} = request.params;
	database('players')
		.where('country_id', id)
		.then(player => {
			player.length ?
				response.status(200).json(player) :
				response.status(404).send({
					error: 'team does not exist'
				});
		})
		.catch(error => {
			response.status(500).json({
				error
			});
		});
});

app.listen(port, () => {
	console.log('server is listening on 3000');
});