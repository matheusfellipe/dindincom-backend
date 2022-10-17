const conexao = require('../database/conexao');
const bcrypt = require('bcrypt')

module.exports = {
     async registrar(requisicao,resposta) {
        const {nome,dt_nascimento,telefone,endereco,email,senha,id_perfil=1} = requisicao.body;
        const senhaEncriptografada = bcrypt.hashSync(senha,6)

        await conexao.raw('INSERT INTO usuario (nome,dt_nascimento,telefone,endereco,email,senha,id_perfil) VALUES (?,?,?,?,?,?,?)',[
            nome,
            dt_nascimento,
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
            if(!usuario){
                resposta.status(401).json({
                    error: "Nenhum usuário com esse e-mail"
                })
            } 
            else {
                const senhaBanco = usuario.rows.map(i=>i['senha'])
                
                return bcrypt
                .compare(senha,senhaBanco[0])
                .then(senhaValida=>{
                    if(!senhaValida){
                        resposta.status(401).json({
                            error: "Usuário não autorizado"
                        })
                    } else {
                        return resposta.status(200).send({message:"Usuário autorizado"})
                    }
                })
            }
        })
     }
}