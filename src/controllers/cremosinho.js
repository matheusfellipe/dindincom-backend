const conexao = require('../database/conexao');


module.exports = {
    async index(requisicao, resposta) {


        // const [count] = await conexao.raw('SELECT COUNT(*) cremosinho');
        // console.log(count);
        const cremosinho = await conexao.raw(`
        SELECT * FROM cremosinho ORDER BY sabor
        `)



        return resposta.json(cremosinho.rows);
    },
    async criar(requisicao, resposta) {

        try {
            const { sabor, vlr_unitario, qtd_estoque, inativo  } = requisicao.body;


            const res = await conexao.raw(`INSERT INTO cremosinho (sabor,vlr_unitario,qtd_estoque,inativo) VALUES (?,?,?,?)`, [
                sabor,
                vlr_unitario,
                qtd_estoque,
                inativo
            ])
           
            return resposta.status(200).send(res);
        } catch (error) {
            return resposta.status(400).send(error)
        }

    },

    async delete(requisicao, resposta) {
        try {
            const { id } = requisicao.params;
            await conexao.raw('DELETE FROM cremosinho WHERE id_cremosinho = ?', [id])
            return resposta.status(204).send(id);

        } catch (error) {
            return resposta.status(400).send(error);
        }

    },

    async update(requisicao, resposta) {
        try {
            const { id } = requisicao.params;
            const { sabor, vlr_unitario, qtd_estoque, inativo } = requisicao.body;


            await conexao.raw('UPDATE cremosinho SET sabor = ?,vlr_unitario= ?,qtd_estoque = ?, inativo = ? WHERE id_cremosinho = ?', [
                sabor, vlr_unitario, qtd_estoque, inativo, id
            ])

        } catch (error) {
            return resposta.status(204).send(error);
        }

    },
    async consultarUm(requisicao, resposta) {
        try {
            const { id } = requisicao.query;
            const cremosinho = await conexao.raw(`
            SELECT * FROM cremosinho WHERE id_cremosinho = ?`, [id]
            )

            return resposta.json(cremosinho);
        } catch (error) {
            return resposta.status(400).send(error)
        }

    }
}