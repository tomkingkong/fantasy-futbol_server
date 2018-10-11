const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const knex = require('../db/knex');
const { app, database } = require('../server');

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach(done => {
    database.migrate.rollback().then(() => {
      database.migrate.latest().then(() => {
        return database.seed.run().then(() => {
          done();
        });
      });
    });
  });

  describe('GET Routes', () => {
    it('/api/v1/countries : should retrieve all the countries', done => {
      chai
        .request(app)
        .get('/api/v1/countries')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.equal(2);
          res.should.have.json;
          res.body[0].should.have.property('id');
          res.body[1].should.have.property('id');
          res.body[0].id.should.equal(1);
          res.body[1].id.should.equal(2);
          res.body[0].should.have.property('name');
          res.body[1].should.have.property('name');
          res.body[0].name.should.equal('Argentina');
          res.body[1].name.should.equal('Spain');
          res.body[0].should.have.property('flag');
          res.body[1].should.have.property('flag');
          res.body[0].flag.should.equal('https://cdn.sofifa.org/flags/52.png');
          res.body[1].flag.should.equal('https://cdn.sofifa.org/flags/45.png');
          done();
        });
    });
    it('/api/v1/players : should retrieve all players', done => {
      chai
        .request(app)
        .get('/api/v1/players')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(2);
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('country_id');
          res.body[0].should.have.property('Name');
          res.body[0].should.have.property('Age');
          res.body[0].should.have.property('Photo');
          res.body[0].should.have.property('Nationality');
          res.body[0].should.have.property('Club');
          res.body[0].should.have.property('Overall');
          res.body[0].should.have.property('Potential');
          res.body[0].should.have.property('Value');
          res.body[0].should.have.property('Wage');
          res.body[0].should.have.property('Acceleration');
          res.body[0].should.have.property('Aggression');
          res.body[0].should.have.property('Agility');
          res.body[0].should.have.property('Balance');
          res.body[0].should.have.property('Ball_control');
          res.body[0].should.have.property('Composure');
          res.body[0].should.have.property('Crossing');
          res.body[0].should.have.property('Curve');
          res.body[0].should.have.property('Dribbling');
          res.body[0].should.have.property('Finishing');
          res.body[0].should.have.property('Free_kick_accuracy');
          res.body[0].should.have.property('GK_handling');
          res.body[0].should.have.property('GK_kicking');
          res.body[0].should.have.property('GK_positioning');
          res.body[0].should.have.property('GK_reflexes');
          res.body[0].should.have.property('Heading_accuracy');
          res.body[0].should.have.property('Interceptions');
          res.body[0].should.have.property('Jumping');
          res.body[0].should.have.property('Long_passing');
          res.body[0].should.have.property('Long_shots');
          res.body[0].should.have.property('Marking');
          res.body[0].should.have.property('Penalties');
          res.body[0].should.have.property('Positioning');
          res.body[0].should.have.property('Reactions');
          res.body[0].should.have.property('Short_passing');
          res.body[0].should.have.property('Shot_power');
          res.body[0].should.have.property('Sliding_tackle');
          res.body[0].should.have.property('Sprint_speed');
          res.body[0].should.have.property('Stamina');
          res.body[0].should.have.property('Standing_tackle');
          res.body[0].should.have.property('Strength');
          res.body[0].should.have.property('Vision');
          res.body[0].should.have.property('Volleys');
          res.body[0].should.have.property('Positions');
          res.body[1].should.have.property('Name');
          res.body[1].should.have.property('Age');
          res.body[1].should.have.property('Photo');
          res.body[1].should.have.property('Nationality');
          res.body[1].should.have.property('Club');
          res.body[1].should.have.property('Overall');
          res.body[1].should.have.property('Potential');
          res.body[1].should.have.property('Value');
          res.body[1].should.have.property('Wage');
          res.body[1].should.have.property('Acceleration');
          res.body[1].should.have.property('Aggression');
          res.body[1].should.have.property('Agility');
          res.body[1].should.have.property('Balance');
          res.body[1].should.have.property('Ball_control');
          res.body[1].should.have.property('Composure');
          res.body[1].should.have.property('Crossing');
          res.body[1].should.have.property('Curve');
          res.body[1].should.have.property('Dribbling');
          res.body[1].should.have.property('Finishing');
          res.body[1].should.have.property('Free_kick_accuracy');
          res.body[1].should.have.property('GK_diving');
          res.body[1].should.have.property('GK_handling');
          res.body[1].should.have.property('GK_kicking');
          res.body[1].should.have.property('GK_positioning');
          res.body[1].should.have.property('GK_reflexes');
          res.body[1].should.have.property('Heading_accuracy');
          res.body[1].should.have.property('Interceptions');
          res.body[1].should.have.property('Jumping');
          res.body[1].should.have.property('Long_passing');
          res.body[1].should.have.property('Long_shots');
          res.body[1].should.have.property('Marking');
          res.body[1].should.have.property('Penalties');
          res.body[1].should.have.property('Positioning');
          res.body[1].should.have.property('Reactions');
          res.body[1].should.have.property('Short_passing');
          res.body[1].should.have.property('Shot_power');
          res.body[1].should.have.property('Sliding_tackle');
          res.body[1].should.have.property('Sprint_speed');
          res.body[1].should.have.property('Stamina');
          res.body[1].should.have.property('Standing_tackle');
          res.body[1].should.have.property('Strength');
          res.body[1].should.have.property('Vision');
          res.body[1].should.have.property('Volleys');
          res.body[1].should.have.property('Positions');
          res.body[0].Name.should.equal('L. Messi');
          res.body[0].country_id.should.equal(1);
          res.body[0].Age.should.equal('30');
          res.body[0].Photo.should.equal(
            'https://cdn.sofifa.org/players/4/18/158023.png'
          );
          res.body[0].Nationality.should.equal('Argentina');
          res.body[0].Club.should.equal('FC Barcelona');
          res.body[0].Overall.should.equal('93');
          res.body[0].Potential.should.equal('93');
          res.body[0].Value.should.equal('€105M');
          res.body[0].Wage.should.equal('€565K');
          res.body[0].Acceleration.should.equal('92');
          res.body[0].Aggression.should.equal('48');
          res.body[0].Agility.should.equal('90');
          res.body[0].Balance.should.equal('95');
          res.body[0].Ball_control.should.equal('95');
          res.body[0].Composure.should.equal('96');
          res.body[0].Crossing.should.equal('77');
          res.body[0].Curve.should.equal('89');
          res.body[0].Dribbling.should.equal('97');
          res.body[0].Finishing.should.equal('95');
          res.body[0].Free_kick_accuracy.should.equal('90');
          res.body[0].GK_diving.should.equal('6');
          res.body[0].GK_handling.should.equal('11');
          res.body[0].GK_kicking.should.equal('15');
          res.body[0].GK_positioning.should.equal('14');
          res.body[0].GK_reflexes.should.equal('8');
          res.body[0].Heading_accuracy.should.equal('71');
          res.body[0].Interceptions.should.equal('22');
          res.body[0].Jumping.should.equal('68');
          res.body[0].Long_passing.should.equal('87');
          res.body[0].Long_shots.should.equal('88');
          res.body[0].Marking.should.equal('13');
          res.body[0].Penalties.should.equal('74');
          res.body[0].Positioning.should.equal('93');
          res.body[0].Reactions.should.equal('95');
          res.body[0].Short_passing.should.equal('88');
          res.body[0].Shot_power.should.equal('85');
          res.body[0].Sliding_tackle.should.equal('26');
          res.body[0].Sprint_speed.should.equal('87');
          res.body[0].Stamina.should.equal('73');
          res.body[0].Standing_tackle.should.equal('28');
          res.body[0].Strength.should.equal('59');
          res.body[0].Vision.should.equal('90');
          res.body[0].Volleys.should.equal('85');
          res.body[0].Positions.should.equal('RW');
          res.body[1].Name.should.equal('Cristiano Ronaldo');
          res.body[1].Age.should.equal('32');
          res.body[1].Photo.should.equal(
            'https://cdn.sofifa.org/players/4/18/20801.png'
          );
          res.body[1].Nationality.should.equal('Portugal');
          res.body[1].Club.should.equal('Real Madrid CF');
          res.body[1].Overall.should.equal('94');
          res.body[1].Potential.should.equal('94');
          res.body[1].Value.should.equal('€95.5M');
          res.body[1].Wage.should.equal('€565K');
          res.body[1].Acceleration.should.equal('89');
          res.body[1].Aggression.should.equal('63');
          res.body[1].Agility.should.equal('89');
          res.body[1].Balance.should.equal('63');
          res.body[1].Ball_control.should.equal('93');
          res.body[1].Composure.should.equal('95');
          res.body[1].Crossing.should.equal('85');
          res.body[1].Curve.should.equal('81');
          res.body[1].Dribbling.should.equal('91');
          res.body[1].Finishing.should.equal('94');
          res.body[1].Free_kick_accuracy.should.equal('76');
          res.body[1].GK_diving.should.equal('7');
          res.body[1].GK_handling.should.equal('11');
          res.body[1].GK_kicking.should.equal('15');
          res.body[1].GK_positioning.should.equal('14');
          res.body[1].GK_reflexes.should.equal('11');
          res.body[1].Heading_accuracy.should.equal('88');
          res.body[1].Interceptions.should.equal('29');
          res.body[1].Jumping.should.equal('95');
          res.body[1].Long_passing.should.equal('77');
          res.body[1].Long_shots.should.equal('92');
          res.body[1].Marking.should.equal('22');
          res.body[1].Penalties.should.equal('85');
          res.body[1].Positioning.should.equal('95');
          res.body[1].Reactions.should.equal('96');
          res.body[1].Short_passing.should.equal('83');
          res.body[1].Shot_power.should.equal('94');
          res.body[1].Sliding_tackle.should.equal('23');
          res.body[1].Sprint_speed.should.equal('91');
          res.body[1].Stamina.should.equal('92');
          res.body[1].Standing_tackle.should.equal('31');
          res.body[1].Strength.should.equal('80');
          res.body[1].Vision.should.equal('85');
          res.body[1].Volleys.should.equal('88');
          res.body[1].Positions.should.equal('ST LW');
          done();
        });
    });

    it('/api/v1/country/:id/players : should retrieve all players from a country', done => {
      chai
        .request(app)
        .get('/api/v1/players/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].Name.should.equal('L. Messi');
          res.body[0].country_id.should.equal(1);
          res.body[0].Age.should.equal('30');
          res.body[0].Photo.should.equal(
            'https://cdn.sofifa.org/players/4/18/158023.png'
          );
          res.body[0].Nationality.should.equal('Argentina');
          res.body[0].Club.should.equal('FC Barcelona');
          res.body[0].Overall.should.equal('93');
          res.body[0].Potential.should.equal('93');
          res.body[0].Value.should.equal('€105M');
          res.body[0].Wage.should.equal('€565K');
          res.body[0].Acceleration.should.equal('92');
          res.body[0].Aggression.should.equal('48');
          res.body[0].Agility.should.equal('90');
          res.body[0].Balance.should.equal('95');
          res.body[0].Ball_control.should.equal('95');
          res.body[0].Composure.should.equal('96');
          res.body[0].Crossing.should.equal('77');
          res.body[0].Curve.should.equal('89');
          res.body[0].Dribbling.should.equal('97');
          res.body[0].Finishing.should.equal('95');
          res.body[0].Free_kick_accuracy.should.equal('90');
          res.body[0].GK_diving.should.equal('6');
          res.body[0].GK_handling.should.equal('11');
          res.body[0].GK_kicking.should.equal('15');
          res.body[0].GK_positioning.should.equal('14');
          res.body[0].GK_reflexes.should.equal('8');
          res.body[0].Heading_accuracy.should.equal('71');
          res.body[0].Interceptions.should.equal('22');
          res.body[0].Jumping.should.equal('68');
          res.body[0].Long_passing.should.equal('87');
          res.body[0].Long_shots.should.equal('88');
          res.body[0].Marking.should.equal('13');
          res.body[0].Penalties.should.equal('74');
          res.body[0].Positioning.should.equal('93');
          res.body[0].Reactions.should.equal('95');
          res.body[0].Short_passing.should.equal('88');
          res.body[0].Shot_power.should.equal('85');
          res.body[0].Sliding_tackle.should.equal('26');
          res.body[0].Sprint_speed.should.equal('87');
          res.body[0].Stamina.should.equal('73');
          res.body[0].Standing_tackle.should.equal('28');
          res.body[0].Strength.should.equal('59');
          res.body[0].Vision.should.equal('90');
          res.body[0].Volleys.should.equal('85');
          res.body[0].Positions.should.equal('RW');
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('country_id');
          res.body[0].should.have.property('Name');
          res.body[0].should.have.property('Age');
          res.body[0].should.have.property('Photo');
          res.body[0].should.have.property('Nationality');
          res.body[0].should.have.property('Club');
          res.body[0].should.have.property('Overall');
          res.body[0].should.have.property('Potential');
          res.body[0].should.have.property('Value');
          res.body[0].should.have.property('Wage');
          res.body[0].should.have.property('Acceleration');
          res.body[0].should.have.property('Aggression');
          res.body[0].should.have.property('Agility');
          res.body[0].should.have.property('Balance');
          res.body[0].should.have.property('Ball_control');
          res.body[0].should.have.property('Composure');
          res.body[0].should.have.property('Crossing');
          res.body[0].should.have.property('Curve');
          res.body[0].should.have.property('Dribbling');
          res.body[0].should.have.property('Finishing');
          res.body[0].should.have.property('Free_kick_accuracy');
          res.body[0].should.have.property('GK_handling');
          res.body[0].should.have.property('GK_kicking');
          res.body[0].should.have.property('GK_positioning');
          res.body[0].should.have.property('GK_reflexes');
          res.body[0].should.have.property('Heading_accuracy');
          res.body[0].should.have.property('Interceptions');
          res.body[0].should.have.property('Jumping');
          res.body[0].should.have.property('Long_passing');
          res.body[0].should.have.property('Long_shots');
          res.body[0].should.have.property('Marking');
          res.body[0].should.have.property('Penalties');
          res.body[0].should.have.property('Positioning');
          res.body[0].should.have.property('Reactions');
          res.body[0].should.have.property('Short_passing');
          res.body[0].should.have.property('Shot_power');
          res.body[0].should.have.property('Sliding_tackle');
          res.body[0].should.have.property('Sprint_speed');
          res.body[0].should.have.property('Stamina');
          res.body[0].should.have.property('Standing_tackle');
          res.body[0].should.have.property('Strength');
          res.body[0].should.have.property('Vision');
          res.body[0].should.have.property('Volleys');
          res.body[0].should.have.property('Positions');
          done();
        });
    });

    it('/api/v1/players/:id : should a specific player by given id', done => {
      chai
        .request(app)
        .get('/api/v1/country/1/players')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].Name.should.equal('L. Messi');
          res.body[0].country_id.should.equal(1);
          res.body[0].Age.should.equal('30');
          res.body[0].Photo.should.equal(
            'https://cdn.sofifa.org/players/4/18/158023.png'
          );
          res.body[0].Nationality.should.equal('Argentina');
          res.body[0].Club.should.equal('FC Barcelona');
          res.body[0].Overall.should.equal('93');
          res.body[0].Potential.should.equal('93');
          res.body[0].Value.should.equal('€105M');
          res.body[0].Wage.should.equal('€565K');
          res.body[0].Acceleration.should.equal('92');
          res.body[0].Aggression.should.equal('48');
          res.body[0].Agility.should.equal('90');
          res.body[0].Balance.should.equal('95');
          res.body[0].Ball_control.should.equal('95');
          res.body[0].Composure.should.equal('96');
          res.body[0].Crossing.should.equal('77');
          res.body[0].Curve.should.equal('89');
          res.body[0].Dribbling.should.equal('97');
          res.body[0].Finishing.should.equal('95');
          res.body[0].Free_kick_accuracy.should.equal('90');
          res.body[0].GK_diving.should.equal('6');
          res.body[0].GK_handling.should.equal('11');
          res.body[0].GK_kicking.should.equal('15');
          res.body[0].GK_positioning.should.equal('14');
          res.body[0].GK_reflexes.should.equal('8');
          res.body[0].Heading_accuracy.should.equal('71');
          res.body[0].Interceptions.should.equal('22');
          res.body[0].Jumping.should.equal('68');
          res.body[0].Long_passing.should.equal('87');
          res.body[0].Long_shots.should.equal('88');
          res.body[0].Marking.should.equal('13');
          res.body[0].Penalties.should.equal('74');
          res.body[0].Positioning.should.equal('93');
          res.body[0].Reactions.should.equal('95');
          res.body[0].Short_passing.should.equal('88');
          res.body[0].Shot_power.should.equal('85');
          res.body[0].Sliding_tackle.should.equal('26');
          res.body[0].Sprint_speed.should.equal('87');
          res.body[0].Stamina.should.equal('73');
          res.body[0].Standing_tackle.should.equal('28');
          res.body[0].Strength.should.equal('59');
          res.body[0].Vision.should.equal('90');
          res.body[0].Volleys.should.equal('85');
          res.body[0].Positions.should.equal('RW');
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('country_id');
          res.body[0].should.have.property('Name');
          res.body[0].should.have.property('Age');
          res.body[0].should.have.property('Photo');
          res.body[0].should.have.property('Nationality');
          res.body[0].should.have.property('Club');
          res.body[0].should.have.property('Overall');
          res.body[0].should.have.property('Potential');
          res.body[0].should.have.property('Value');
          res.body[0].should.have.property('Wage');
          res.body[0].should.have.property('Acceleration');
          res.body[0].should.have.property('Aggression');
          res.body[0].should.have.property('Agility');
          res.body[0].should.have.property('Balance');
          res.body[0].should.have.property('Ball_control');
          res.body[0].should.have.property('Composure');
          res.body[0].should.have.property('Crossing');
          res.body[0].should.have.property('Curve');
          res.body[0].should.have.property('Dribbling');
          res.body[0].should.have.property('Finishing');
          res.body[0].should.have.property('Free_kick_accuracy');
          res.body[0].should.have.property('GK_handling');
          res.body[0].should.have.property('GK_kicking');
          res.body[0].should.have.property('GK_positioning');
          res.body[0].should.have.property('GK_reflexes');
          res.body[0].should.have.property('Heading_accuracy');
          res.body[0].should.have.property('Interceptions');
          res.body[0].should.have.property('Jumping');
          res.body[0].should.have.property('Long_passing');
          res.body[0].should.have.property('Long_shots');
          res.body[0].should.have.property('Marking');
          res.body[0].should.have.property('Penalties');
          res.body[0].should.have.property('Positioning');
          res.body[0].should.have.property('Reactions');
          res.body[0].should.have.property('Short_passing');
          res.body[0].should.have.property('Shot_power');
          res.body[0].should.have.property('Sliding_tackle');
          res.body[0].should.have.property('Sprint_speed');
          res.body[0].should.have.property('Stamina');
          res.body[0].should.have.property('Standing_tackle');
          res.body[0].should.have.property('Strength');
          res.body[0].should.have.property('Vision');
          res.body[0].should.have.property('Volleys');
          res.body[0].should.have.property('Positions');
          done();
        });
    });

    it('/api/v1/users : should retrieve all users', done => {
      chai
        .request(app)
        .get('/api/v1/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.should.be.json;
          res.body.length.should.equal(1);
          res.body[0].username.should.equal('Paul');
          res.body[0].password.should.equal('password');
          res.body[0].player_id_1.should.equal(1);
          res.body[0].player_id_2.should.equal(2);
          // res.body[0].player_id_3.should.equal(2);

          res.body[0].should.have.property('username');
          res.body[0].should.have.property('password');
          res.body[0].should.have.property('player_id_1');
          res.body[0].should.have.property('player_id_2');
          res.body[0].should.have.property('player_id_3');
          res.body[0].should.have.property('player_id_4');
          res.body[0].should.have.property('player_id_5');
          res.body[0].should.have.property('player_id_6');
          res.body[0].should.have.property('player_id_7');
          res.body[0].should.have.property('player_id_8');
          res.body[0].should.have.property('player_id_9');
          res.body[0].should.have.property('player_id_10');
          res.body[0].should.have.property('player_id_11');
          done();
        });
    });

    it('/api/v1/users/:id : should retrieve a specific user with given id', done => {
      chai
        .request(app)
        .get('/api/v1/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.length.should.equal(1);
          res.body[0].should.have.property('id');
          res.body[0].should.have.property('username');
          res.body[0].should.have.property('password');
          res.body[0].should.have.property('player_id_1');
          res.body[0].should.have.property('player_id_2');
          res.body[0].should.have.property('player_id_3');
          res.body[0].should.have.property('player_id_4');
          res.body[0].should.have.property('player_id_5');
          res.body[0].should.have.property('player_id_6');
          res.body[0].should.have.property('player_id_7');
          res.body[0].should.have.property('player_id_8');
          res.body[0].should.have.property('player_id_9');
          res.body[0].should.have.property('player_id_10');
          res.body[0].should.have.property('player_id_11');
          res.body[0].username.should.equal('Paul');
          res.body[0].password.should.equal('password');
          res.body[0].player_id_1.should.equal(1);
          res.body[0].player_id_2.should.equal(2);
          done();
        });
    });
  });

  describe('POST Routes', () => {
    let optionsObj;

    describe('/api/v1/users', () => {
      it('should post a new user if correct body is given', done => {
        optionsObj = { username: 'Paul', password: 'cliffhangar' };
        chai
          .request(app)
          .post('/api/v1/users')
          .send(optionsObj)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.have.json;
            res.body.should.have.property('msg');
            res.body.msg.should.equal(
              'Username: Paul was created with id of 2'
            );
            done();
          });
      });

      it('should return proper error if incorrect body is given', done => {
        optionsObj = { usernme: 'Paul', passwrd: 'cliffhangar' };

        chai
          .request(app)
          .post('/api/v1/users')
          .send(optionsObj)
          .end((err, res) => {
            res.should.have.status(422);
            res.should.have.json;
            res.body.should.have.property('msg');
            res.body.msg.should.equal('Missing one or more fields');
            done();
          });
      });
    });

    describe('/api/v1/countries', () => {
      let optionsObj;
      it('should add a new country if correct body is given', done => {
        let optionsObj = {
          name: 'Italy',
          flag: 'https://cdn.sofifa.org/flags/52.png'
        };

        chai
          .request(app)
          .post('/api/v1/countries')
          .send(optionsObj)
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('msg');
            res.body.msg.should.equal(
              'Italy was added to countries list with an id of 3'
            );
            done();
          });
      });

      it('should return proper error if given incorrect body', done => {
        const optionsObj = {
          nae: '',
          flag: 'https://cdn.sofifa.org/flags/52.png'
        };

        chai
          .request(app)
          .post('/api/v1/countries')
          .send(optionsObj)
          .end((err, res) => {
            res.should.have.status(500);
            res.should.be.json;
            res.body.should.have.property('error');
            res.body.error.should.equal(
              'insert into "countries" ("name") values ($1) returning "id" - null value in column "name" violates not-null constraint'
            );
            done();
          });
      });
    });
  });

  describe('PUT', () => {
    describe('/api/v1/users/:id/:player/players/:player_id', () => {
      it('should update a users player list if correct parameters are given', done => {
        chai
          .request(app)
          .put('/api/v1/users/1/3/players/2')
          .end((err, res) => {
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.have.property('msg');
            res.body.msg.should.equal('player_id_3 was edited');
            done();
          });
      });

      // it('should return proper error if incorrect parameters are given', done => {
      //   chai
      //     .request(app)
      //     .put('/api/v1/users/1/23/players/2')
      //     .end((err, res) => {
      //       res.should.have.status(422);
      //       res.should.be.json;
      //       res.body.should.have.property('msg');
      //       res.body.msg.should.equal('Users player_id_23 does not exist');
      //       done();
      //     });
      // });
    });
    describe('/api/v1/users/:id', () => {
      let optionsObj;
      it('should update user information if correct body is given', done => {
        optionsObj = { username: 'Link', password: 'itIsOinktober' };
        chai
          .request(app)
          .put('/api/v1/users/1')
          .send(optionsObj)
          .end((err, res) => {
            res.should.have.status(202);
            res.should.be.json;
            res.body.should.have.property('msg');
            res.body.msg.should.equal(
              'edited user {username: Link, password: itIsOinktober}'
            );
            done();
          });
      });

      it('should return proper error if incorrect body is given', done => {
        optionsObj = { userna: 'link', passwo: 'dsd' };
        chai
          .request(app)
          .put('/api/v1/users/1')
          .send(optionsObj)
          .end((err, res) => {
            res.should.have.status(422);
            res.should.be.json;
            res.body.should.have.property('error');
            res.body.error.should.equal('Incorrect fields');
            done();
          });
      });
    });
  });

  describe('DELETE', () => {
    describe('/api/v1/users/:id', () => {
      it('should delete a user if correct parameters are given', done => {
        chai
          .request(app)
          .delete('/api/v1/users/1')
          .end((err, res) => {
            res.should.have.status(202);
            res.should.be.json;
            res.body.should.have.property('msg');
            res.body.msg.should.equal('user successfully deleted');
            done();
          });
      });

      it('should return proper error if given incorrect parameters', done => {
        chai
          .request(app)
          .delete('/api/v1/users/230')
          .end((err, res) => {
            res.should.have.status(422);
            res.should.be.json;
            res.body.should.have.property('error');
            res.body.error.should.equal('user does not exist');
            done();
          });
      });
    });

    describe('/api/v1/players/:id', () => {
      it('should delete a player if give correct parameters', done => {
        chai
          .request(app)
          .delete('/api/v1/players/2')
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
    });
  });
});

// it('should return a 404 for a route that does not exist' done => {
//   chai
//     .request(server)
//     .get('/sad')
//     .end((err,res) => {
//       res.should.have.status(404);
//       done();
//     });
// });
// });
