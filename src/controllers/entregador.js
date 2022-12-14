const conexao = require('../database/conexao');


module.exports = {
    async index(requisicao, resposta) {

        const entregador = await conexao.raw(`
        SELECT * FROM entregador ORDER BY nome
        `)

        return resposta.json(entregador.rows);
    },
    async criar(requisicao, resposta) {

        try {
            const { nome, cpf, telefone, placa_veiculo,rota} = requisicao.body;


            const res = await conexao.raw(`INSERT INTO entregador (nome,cpf,telefone,placa_veiculo,rota) VALUES (?,?,?,?,?)`, [
                nome,
                cpf,
                telefone,
                placa_veiculo,
                rota
            ])
            console.log(res.rows)
            return resposta.status(200).send(res.rows);

        } catch (error) {
            return resposta.status(400).json({ message: "Não foi possivel criar" })
        }

    },

    async delete(requisicao, resposta) {
        try {
            const { id } = requisicao.params;
            await conexao.raw('DELETE FROM entregador WHERE id_entregador = ?', [id])
            return resposta.status(204).send(id);

        } catch (error) {
            return resposta.status(400).send(error);
        }

    },

    async update(requisicao, resposta) {
        try {
            const { id } = requisicao.params;
            const { nome, cpf, telefone, placa_veiculo,rota } = requisicao.body;


            await conexao.raw('UPDATE entregador SET nome = ?,cpf= ?,telefone = ?, placa_veiculo = ?,rota = ? WHERE id_entregador = ?', [
                nome, cpf, telefone, placa_veiculo,rota, id
            ])

        } catch (error) {
            return resposta.status(204).send(error);
        }

    },
    async consultarUm(requisicao, resposta) {
        try {
            const { id } = requisicao.query;
            const entregador = await conexao.raw(`
            SELECT * FROM entregador WHERE id_entregador = ?`, [id]
            )

            return resposta.json(entregador);
        } catch (error) {
            return resposta.status(400).send(error)
        }

    }
}