/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('usuario').insert([
    { nome: 'Admin',dt_nascimento:'2022-10-17',telefone:'000000000',endereco:'admin',email:'admin@admin.com',senha:'admin',id_perfil: 3},
    
  ]);
};
