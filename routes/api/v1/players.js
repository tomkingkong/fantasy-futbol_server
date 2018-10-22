const express = require('express')
const router = express.Router()
const env = process.env.NODE_ENV || 'development';
const configure = require('../../../knexfile')[env];
const database = require('knex')(configure);

router.get('/', (req, res) => {
  const { start, end, name, club } = req.query;
  try {
    if (start) {
      database('players')
        .whereBetween('id', [start, end])
        .then(player => {
          res.status(200).json(player);
        });
    } else if (name) {
      database('players')
        .where('Name', name)
        .then(player => {
          res.status(200).json(player);
        });
    } else if (club) {
      database('players')
        .where('Club', club)
        .then(player => {
          res.status(200).json(player);
        });
    } else {
      database('players').then(players => res.status(200).json(players));
    }
  } catch (err) {
    res.status(500).json({
      err
    });
  }
});

router.get('/:id', (req, res) => {
	const {
		id
	} = req.params;
	database('players')
		.where('id', id)
		.then(player => {
			player.length ?
				res.status(200).json(player) :
				reponse.status(404).send({
					error: 'player does not exist'
				});
		})
		.catch(error => {
			res.status(500).json({
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