/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('status').insert([
    {id_status: 1, nome: 'aberto'},
    {id_status: 2, nome: 'pronto'},
    {id_status: 3, nome: 'entregue'},
    {id_status: 4, nome: 'pendente'}
  ]);
};
