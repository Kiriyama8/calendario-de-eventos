
exports.up = function(knex) {
    return knex.schema.createTable('events', function (table) {
        table.string('id').primary();

        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.datetime('horario').notNullable();

        table.string('cidade');
        table.string('uf', 2);

        table.string('user_id').notNullable()
        table.foreign('user_id').references('id').inTable('users')

        table.timestamps();
      })
};

exports.down = function(knex) {
    return knex.schema.dropTable('events');
};
