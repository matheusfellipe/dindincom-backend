const conexao = require('../database/conexao');


module.exports = {
    async index(requisicao, resposta) {

    
        // const [count] = await conexao.raw('SELECT COUNT(*) cremosinho');
        // console.log(count);
        const cremosinho = await conexao.raw(`
        SELECT * FROM cremosinho ORDER BY sabor
        `)
            

        
        return resposta.json(cremosinho);
    },
    async criar(requisicao, resposta) {
        const { sabor,vlr_unitario,qtd_estoque,inativo='f' } = requisicao.body;
       

        const res = await conexao.raw(`INSERT INTO cremosinho (sabor,vlr_unitario,qtd_estoque,inativo) VALUES (?,?,?,?)`,[
            sabor,
            vlr_unitario,
            qtd_estoque,
            inativo
        ])
        return resposta.send(res);
    },

    async delete(requisicao, resposta) {
        const { id } = requisicao.params;
        

        
        await conexao.raw('DELETE FROM cremosinho WHERE id_cremosinho = ?',[id])
        return resposta.status(204).send(id);
    },

    async update(requisicao, resposta) {
        const { id } = requisicao.params;
        const { sabor,vlr_unitario,qtd_estoque,inativo} = requisicao.body;

        
        await conexao.raw('UPDATE cremosinho SET sabor = ?,vlr_unitario= ?,qtd_estoque = ?, inativo = ?',[
            sabor,vlr_unitario,qtd_estoque,inativo
        ])
        return resposta.status(204).send(id);
    },
    async consultarUm(requisicao, resposta) {
        try {
            const { id } = requisicao.query;
            const cremosinho = await conexao.raw(`
            SELECT * FROM cremosinho WHERE id_cremosinho = ?`,[id]
            )
            
            return resposta.json(cremosinho);
        } catch (error) {
            console.log(error)
        }
      
    }
}