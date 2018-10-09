exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('countries', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('players', function(table) {
      table.increments('id').primary();
      // table.integer('country_id').unsigned();
      // table.foreign('country_id').references('countries.id');
      table.string('Name');
      table.integer('Age');
      table.string('Nationality');
      table.string('Preferred positions');
      table.string('Club');
      table.string('Overall');
      table.string('Potential');
      table.string('Value');
      table.string('Wage');
      table.string('Acceleration');
      table.string('Aggression');
      table.string('Agility');
      table.string('Balance');
      table.string('Ball control');
      table.string('Composure');
      table.string('Crossing');
      table.string('Curve');
      table.string('Dribbling');
      table.string('Finishing');
      table.string('Free kick accuracy');
      table.string('GK diving');
      table.string('GK handling');
      table.string('GK kicking');
      table.string('GK positioning');
      table.string('GK reflexes');
      table.string('Heading accuracy');
      table.string('Interceptions');
      table.string('Jumping');
      table.string('Long passing');
      table.string('Long shots');
      table.string('Marking');
      table.string('Penalties');
      table.string('Positioning');
      table.string('Reactions');
      table.string('Short passing');
      table.string('Shot power');
      table.string('Sliding tackle');
      table.string('Sprint speed');
      table.string('Stamina');
      table.string('Standing tackle');
      table.string('Strength');
      table.string('Vision');
      table.string('Volleys');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('players'),
    knex.schema.dropTable('countries')
  ]);
};
