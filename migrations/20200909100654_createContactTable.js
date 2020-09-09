exports.up = function(knex) {
    return knex.schema.createTable("contacts", (tbl) => {
        tbl.increments();
        tbl.text("name", 128).notNullable().unique().index();
        tbl.text("email", 255).notNullable();
        tbl.text("message", 255).notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("contacts");
};