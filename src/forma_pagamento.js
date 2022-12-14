/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('forma_pagamento').insert([
    { descricao: 'pix'},
    { descricao: 'dinheiro'},
    { descricao: 'debito'}
  ]);
};
