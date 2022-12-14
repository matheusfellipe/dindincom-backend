const conexao = require('../database/conexao');
const bcrypt = require('bcrypt')

module.exports = {
    async index(requisicao, resposta) {

        const usuario = await conexao.raw(`
        SELECT * FROM usuario ORDER BY nome
        `)

        return resposta.json(usuario.rows);
    },
    async criar(requisicao, resposta) {

        try {
            const { nome,telefone,endereco,email,senha,id_perfil=1} = requisicao.body;
            const senhaEncriptografada = bcrypt.hashSync(senha,6)

            const res = await conexao.raw('INSERT INTO usuario (nome,telefone,endereco,email,senha,id_perfil) VALUES (?,?,?,?,?,?)',[
                nome,
                telefone,
                endereco,
                email,
                senhaEncriptografada,
                id_perfil
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
            await conexao.raw('DELETE FROM usuario WHERE id_usuario = ?', [id])
            return resposta.status(204).send(id);

        } catch (error) {
            return resposta.status(400).send(error);
        }

    },

    async update(requisicao, resposta) {
        try {
            const { id } = requisicao.params;
            const { nome,telefone,endereco,email,senha,id_perfil } = requisicao.body;


            await conexao.raw('UPDATE usuario SET nome = ?,telefone= ?,endereco = ?, email = ?, senha = ?, id_perfil = ? WHERE id_usuario = ?', [
                nome,telefone,endereco,email,senha,id_perfil, id
            ])

        } catch (error) {
            return resposta.status(204).send(error);
        }

    },
    async consultarUm(requisicao, resposta) {
        try {
            const { id } = requisicao.query;
            const usuario = await conexao.raw(`
            SELECT * FROM usuario WHERE id_usuario = ?`, [id]
            )

            return resposta.json(usuario);
        } catch (error) {
            return resposta.status(400).send(error)
        }

    }
}