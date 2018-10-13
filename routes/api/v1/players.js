const express = require('express')
const router = express.Router()
const env = process.env.NODE_ENV || 'development';
const configure = require('../../../knexfile')[env];
const database = require('knex')(configure);

router.get('/', (req, res) => {
	console.log(req.query)
	const start = req.query.start
	const end = req.query.end

	database('players')
		.whereBetween('id', [start, end])
		.then(player => {
			res.status(200).json(player)
		})
});

// router.get('/', (req, res) => {
// 	const playerName = req.query.name
// 	playerName
// 		?
// 		database('players')
// 		.where('Name', playerName)
// 		.then(player => {
// 			res.status(200).json(player)
// 		}) :
// 		database('players')
// 		.then(players => res.status(200).json(players))
// 		.catch(error => {
// 			res.status(500).json({
// 				error
// 			});
// 		});
// });



router.get('/:id', (request, response) => {
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

router.delete('/:id', (req, res) => {
	database('players')
		.where('id', req.params.id)
		.del()
		.then(result => {
			result ?
				res.status(202).json({
					msg: 'player successfully deleted'
				}) :
				res.status(422).json({
					error: 'player does not exist'
				});
		})
		.catch(error => {
			res.status(500).json({
				error
			});
		});
});

module.exports = router