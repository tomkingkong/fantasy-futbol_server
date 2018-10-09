exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('countries', function(table) {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    }),
    knex.schema.createTable('players', function(table) {
      table.increments('id').primary();
      table.integer('country_id').unsigned();
      table.foreign('country_id').references('countries.id');
      table.string('name');
      table.string('position');
      table.string('club');
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
