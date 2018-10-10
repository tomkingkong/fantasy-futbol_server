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
			chai.request(app)
				.get('/api/v1/countries')
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('array')
					res.body.length.should.equal(2);
					res.body[0].should.have.property('id');
					res.body[0].id.should.equal(1);
					res.body[0].should.have.property('name');
					res.body[0].name.should.equal('Argentina');
					res.body[0].should.have.property('group');
					res.body[0].group.should.equal('D');
					res.body[0].should.have.property('flag');
					res.body[0].flag.should.equal('https://cdn.sofifa.org/flags/52.png');

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