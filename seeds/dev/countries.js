exports.seed = function (knex, Promise) {
	return knex('players').del()
		.then(() => knex('countries').del())
		.then(() => {
			return Promise.all([
				knex('players').insert({
					name: 'Ex Player'
				}, 'id')
				.then(country => {
					return knex('players').insert([{
							name: 'Ex player name',
							position: 'goal stopper person',
							country_id: country[0]
						},
						{
							name: 'Ex player 2 name',
							position: 'ball kicker person',
							country_id: country[0]
						}
					])
				})
				.catch(error => console.log(`Error seeding data: ${error}`))
			])
		})
		.catch(error => console.log(`Error seeding data: ${error}`))
};