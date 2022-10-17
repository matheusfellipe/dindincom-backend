/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('perfil').insert([
    {id_perfil: 1, nome: 'usuario'},
    {id_perfil: 2, nome: 'moderador'},
    {id_perfil: 3, nome: 'admin'}
  ]);
};
