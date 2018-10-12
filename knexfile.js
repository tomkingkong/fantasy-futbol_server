module.exports = {

	development: {
		client: 'pg',
		connection: 'postgres://localhost/soccor',
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/dev'
		},
		useNullAsDefault: true
	},

	test: {
		client: 'postgresql',
		connection: 'postgres://localhost/soccor_test',
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/test'
		},
		useNullAsDefault: true
	},

	production: {
		client: 'pg',
		connection: process.env.DATABASE_URL + `?ssl=true`,
		migrations: {
			directory: './db/migrations'
		},
		seeds: {
			directory: './db/seeds/dev'
		},
		useNullAsDefault: true
	}

};