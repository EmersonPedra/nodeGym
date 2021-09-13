const express = require('express');
const server = express();
server.use(express.json());

const treinos = [];

//Rotas
// Rota responsavel por listar todos os treinos
server.get('/treinos', (req, res) =>{
    return res.json({treinos});
});

// Rota para listar um treino especifico
server.get('/treinos/:index', (req, res) => {
    return res.json(req.user);
});

// Rota para adicionar um treino
server.post('/treinos', checkAlunoExists, (req,res) => {
    const corpo = req.body;
    treinos.push(corpo);

    return res.json(treinos);
});

// Rota para deletar um treino
server.delete('/treinos/:index', (req, res) =>{
    const {index} = req.params;

    treinos.splice(index, 1);
    return res.send();
});
server.put('/treinos/:index', checkAlunoInArray, checkAlunoExists, (req, res) => {
    const { index } = req.params; // recupera o index com os dados
    const { nome } = req.body;
    treinos[index] = nome; // sobrepõe/edita o index obtido na rota de acordo com o novo valor
    return res.json(treino);
    })

//Middlewares 
function checkAlunoExists(req, res, next){
    if (!req.body.nome){
        return res.status(400).json({ error: 'É necessário informar o nome do aluno'})
    }
    return next();
}

function checkAlunoInArray(req, res, next){
    const aluno = treinos[req.params.index];
    if (!aluno){
        return res.status(400).json({error:'Aluno não encontrado'})
        req.aluno = aluno;
        return next();
    }
}
server.listen(3000);