const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');
const {app, database} = require('../server');

chai.use(chaiHttp);

describe('API Routes', () => {
	beforeEach(done => {
		database.migrate.rollback()
			.then(() => {
				database.migrate.latest()
					.then(() => {
						return database.seed.run()
							.then(() => {
								done();
							})
					});
			});
	});

	describe('Client Routes', () => {
		it('should return the homepage with text', done => {
			chai.request(server)
				.get('/api/v1/countries')
				.end((err, res) => {
					res.should.have.status(200);
					res.should.be.html;
					res.res.text.should.equal(homepageHTML);
					done();
				});
		});

		// it('should return a 404 for a route that does not exist', done => {
		// 	chai.request(server)
		// 		.get('/sad')
		// 		.end((err, res) => {
		// 			res.should.have.status(404);
		// 			done();
		// 		});
		// });
	});
});