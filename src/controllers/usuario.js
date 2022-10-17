const conexao = require('../database/conexao');
const bcrypt = require('bcrypt')

module.exports = {
     async registrar(requisicao,resposta) {
        const {nome,dt_nascimento,telefone,endereco,email,senha,id_perfil=1} = requisicao.body;
        const senhaEncriptografada = bcrypt.hash(senha,10)

        await conexao.raw('INSERT INTO usuario (nome,dt_nascimento,telefone,endereco,email,senha,id_perfil) VALUES (?,?,?,?,?,?,?)',[
            nome,
            dt_nascimento,
            telefone,
            endereco,
            email,
            senhaEncriptografada
        ])

        return resposta.json();
     }, 


     async login(requisicao,resposta){
        const {email,senha} = requisicao.body;
        await conexao.raw('select * from usuario where email = ?',[email])
        .first()
        .then(usuario=>{
            if(!usuario){
                resposta.status(401).json({
                    error: "Nenhum usuário com esse e-mail"
                })
            } else {
                return bcrypt
                .compare(senha,usuario.senha)
                .then(senhaValida=>{
                    if(!senhaValida){
                        resposta.status(401).json({
                            error: "Usuário não autorizado"
                        })
                    } else {
                        return resposta.status(200).json()
                    }
                })
            }
        })
     }
}