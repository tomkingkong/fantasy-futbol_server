exports.seed = (knex, Promise) => {
  return knex('players')
    .del()
    .then(() => knex('countries').del())
    .then(() => {
      return Promise.all([
        knex('countries')
          .insert([{ name: 'Brazil' }, { name: 'Argentina' }], 'id')
          .then(country => {
            return knex('players').insert([
              {
                Name: 'L. Messi',
                Age: '30',
                Nationality: 'Argentina',
                country_id: country[1],
                Club: 'FC Barcelona',
                Overall: '93',
                Potential: '93',
                Value: '€105M',
                Wage: '€565K',
                Acceleration: '92',
                Aggression: '48',
                Agility: '90',
                Balance: '95',
                'Ball control': '95',
                Composure: '96',
                Crossing: '77',
                Curve: '89',
                Dribbling: '97',
                Finishing: '95',
                'Free kick accuracy': '90',
                'GK diving': '6',
                'GK handling': '11',
                'GK kicking': '15',
                'GK positioning': '14',
                'GK reflexes': '8',
                'Heading accuracy': '71',
                Interceptions: '22',
                Jumping: '68',
                'Long passing': '87',
                'Long shots': '88',
                Marking: '13',
                Penalties: '74',
                Positioning: '93',
                Reactions: '95',
                'Short passing': '88',
                'Shot power': '85',
                'Sliding tackle': '26',
                'Sprint speed': '87',
                Stamina: '73',
                'Standing tackle': '28',
                Strength: '59',
                Vision: '90',
                Volleys: '85'
              },
              {
                Name: 'Cristiano Ronaldo',
                Age: '32',
                Nationality: 'Portugal',
                country_id: country[0],
                Club: 'Real Madrid CF',
                Overall: '94',
                Potential: '94',
                Value: '€95.5M',
                Wage: '€565K',
                Acceleration: '89',
                Aggression: '63',
                Agility: '89',
                Balance: '63',
                'Ball control': '93',
                Composure: '95',
                Crossing: '85',
                Curve: '81',
                Dribbling: '91',
                Finishing: '94',
                'Free kick accuracy': '76',
                'GK diving': '7',
                'GK handling': '11',
                'GK kicking': '15',
                'GK positioning': '14',
                'GK reflexes': '11',
                'Heading accuracy': '88',
                Interceptions: '29',
                Jumping: '95',
                'Long passing': '77',
                'Long shots': '92',
                Marking: '22',
                Penalties: '85',
                Positioning: '95',
                Reactions: '96',
                'Short passing': '83',
                'Shot power': '94',
                'Sliding tackle': '23',
                'Sprint speed': '91',
                Stamina: '92',
                'Standing tackle': '31',
                Strength: '80',
                Vision: '85',
                Volleys: '88'
              }
            ]);
          })
          .then(() => console.log('completed'))
          .catch(error => console.log(error))
      ]);
    })
    .catch(error => console.log(error));
};
