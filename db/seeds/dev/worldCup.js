const playersData = require('../../../data/scrapedPlayers.js');
const countries = require('../../../data/countries.js');

const createPlayer = (knex, player, countryIds) => {
  const matchingCountry = countries.find(
    country => player.Nationality === country.name
  );
  const matchingIndex = countries.indexOf(matchingCountry);
  const matchingId = countryIds[matchingIndex];

  return knex('players').insert(
    {
      country_id: matchingId,
      Name: player.Name,
      Age: player.Age,
      Photo: player.Photo,
      Nationality: player.Nationality,
      Positions: player.Positions,
      Club: player.Club,
      Overall: player.Overall,
      Potential: player.Potential,
      Value: player.Value,
      Wage: player.Wage,
      Acceleration: player.Acceleration,
      Aggression: player.Aggression,
      Agility: player.Agility,
      Balance: player.Balance,
      Ball_control: player.Ball_control,
      Composure: player.Composure,
      Crossing: player.Crossing,
      Curve: player.Curve,
      Dribbling: player.Dribbling,
      Finishing: player.Finishing,
      Free_kick_accuracy: player.Free_kick_accuracy,
      GK_diving: player.GK_diving,
      GK_handling: player.GK_handling,
      GK_kicking: player.GK_kicking,
      GK_positioning: player.GK_positioning,
      GK_reflexes: player.GK_reflexes,
      Heading_accuracy: player.Heading_accuracy,
      Interceptions: player.Interceptions,
      Jumping: player.Jumping,
      Long_passing: player.Long_passing,
      Long_shots: player.Long_shots,
      Marking: player.Marking,
      Penalties: player.Penalties,
      Positioning: player.Positioning,
      Reactions: player.Reactions,
      Short_passing: player.Short_passing,
      Shot_power: player.Shot_power,
      Sliding_tackle: player.Sliding_tackle,
      Sprint_speed: player.Sprint_speed,
      Stamina: player.Stamina,
      Standing_tackle: player.Standing_tackle,
      Strength: player.Strength,
      Vision: player.Vision,
      Volleys: player.Volleys
    },
    'id'
  );
};

exports.seed = (knex, Promise) => {
  return knex('players')
    .del()
    .then(() => knex('countries').del())
    .then(() => {
      let playerPromises = [];
      return Promise.all([
        knex('countries')
          .insert(countries, 'id')
          .then(countryId => {
            playersData.forEach(player => {
              playerPromises.push(createPlayer(knex, player, countryId));
            });
            return Promise.all(playerPromises);
          })
          .then(() => console.log('completed'))
          .catch(error => console.log(error))
      ]);
    })
    .catch(error => console.log(error));
};
