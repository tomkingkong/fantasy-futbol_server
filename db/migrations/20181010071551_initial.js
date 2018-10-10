exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('countries', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('group');
      table.string('flag');
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('players', function(table) {
      table.increments('id').primary();
      table.integer('country_id').unsigned();
      table.foreign('country_id').references('countries.id');
      table.string('Name');
      table.string('Age');
      table.string('Photo');
      table.string('Nationality');
      table.string('Positions');
      table.string('Club');
      table.string('Overall');
      table.string('Potential');
      table.string('Value');
      table.string('Wage');
      table.string('Acceleration');
      table.string('Aggression');
      table.string('Agility');
      table.string('Balance');
      table.string('Ball_control');
      table.string('Composure');
      table.string('Crossing');
      table.string('Curve');
      table.string('Dribbling');
      table.string('Finishing');
      table.string('Free_kick_accuracy');
      table.string('GK_diving');
      table.string('GK_handling');
      table.string('GK_kicking');
      table.string('GK_positioning');
      table.string('GK_reflexes');
      table.string('Heading_accuracy');
      table.string('Interceptions');
      table.string('Jumping');
      table.string('Long_passing');
      table.string('Long_shots');
      table.string('Marking');
      table.string('Penalties');
      table.string('Positioning');
      table.string('Reactions');
      table.string('Short_passing');
      table.string('Shot_power');
      table.string('Sliding_tackle');
      table.string('Sprint_speed');
      table.string('Stamina');
      table.string('Standing_tackle');
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
