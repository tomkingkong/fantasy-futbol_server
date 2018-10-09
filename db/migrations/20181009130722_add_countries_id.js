exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('players', function(table) {
      table.integer('country_id').unsigned();
      table.foreign('country_id').references('countries.id');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('players', function(table) {
      table.dropColumn('country_id');
    })
  ]);
};
