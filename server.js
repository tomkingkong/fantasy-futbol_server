const express = require('express');
const bodyParser = require('body-parser');
const fs = require('file-system');


const env = process.env.NODE_ENV || 'development';
const configure = require('./knexfile')[env];
const database = require('knex')(configure);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

app.put('/api/v1/users/:id/:player/players/:player_id', (req, res) => {
	const userPosition = `player_id_${req.params.player}`
	database('players')
		.where('id', req.params.player_id)
		.then(player => {
			database('users')
				.where('id', req.params.id)
				.update({ [userPosition]: player[0].id })
				.then(() => res.sendStatus(201))
		})
	.catch(error => {
		res.status(500).json({
			error
		})
	})
})

app.put('/api/v1/users/:id', (req, res) => {
	console.log(req.body)
			database('users')
				.where('id', req.params.id)
				.update(req.body)
				.then(() => res.sendStatus(201))
	.catch(error => {
		res.status(500).json({
			error
		})
	})
})

app.delete('/api/v1/users/:id', (req, res) => {
	database('users')
		.where('id', req.params.id)
		.del()
		.then(() => res.status(202).json({
			"msg": "user successfully deleted"
		}))
	.catch(error => {
		res.status(500).json({
			error
		})
	})
})

app.listen(port, () => {
	console.log('server is listening on 3000');
});