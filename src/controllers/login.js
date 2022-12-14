const conexao = require('../database/conexao');
const bcrypt = require('bcrypt')

module.exports = {
     async registrar(requisicao,resposta) {
        const {nome,dt_nascimento,telefone,endereco,email,senha,id_perfil=1} = requisicao.body;
        const senhaEncriptografada = bcrypt.hashSync(senha,6)

        await conexao.raw('INSERT INTO usuario (nome,telefone,endereco,email,senha,id_perfil) VALUES (?,?,?,?,?,?)',[
            nome,
            telefone,
            endereco,
            email,
            senhaEncriptografada,
            id_perfil
        ])

        return resposta.json();
     }, 


     async login(requisicao,resposta){
        const {email,senha} = requisicao.body;
        await conexao.raw('select * from usuario where email = ?',[email])
        // .first()
        .then(usuario=>{
            if(usuario.rows.length === 0){
                resposta.status(401).json({
                    error: "Usuário não cadastrado"
                })
            } 
            else {
                const senhaBanco = usuario.rows.map(i=>i['senha'])
                const [nome] = usuario.rows.map(i=>i.nome)
                return bcrypt
                .compare(senha,senhaBanco[0])
                .then(senhaValida=>{
                    if(!senhaValida){
                        resposta.status(401).json({
                            error: "Usuário não autorizado"
                        })
                    } else {
                        return resposta.status(200).json(nome)
                    }
                })
            }
        })
     }
}