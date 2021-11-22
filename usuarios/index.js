const express = require ('express')
const utils = require ('./utils.js')
require ('dotenv').config()

const jwt= require('jsonwebtoken')
const app = express()
app.use(express.json())

const {HOST, USER, PASSWORD, DATABASE, SECRET} = process.env

app.post('/login', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)
    const sql = 'SELECT * from tb_usuario WHERE idCPF = ? and senha = ?'
    const {
        idCPF,
        senha

    } = req.body

    let values = [
        idCPF,
        senha
    ]

    connection.execute(
        sql,
        values,
        (err, results, fields) =>{
            if(err){
                res.send(err)

                
            }else if(results.length){
                const token = jwt.sign({
                    results
                }, SECRET, {
                    expiresIn: 300
                })
                console.log('Usuário encontrado')
                return res.json({
                    auth:true,
                    token:token,
                    nome: results[0].nome
                })
            }else{
                console.log('Nenhum usuário encontrado')
                res.status(401).send('Nenhum usuário encontrado')
            }
        }    
    
    )

})

app.get('/usuarios', verifyJWT,  (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)
    const sql = 'SELECT * from tb_usuario'
    connection.query(
        sql,
        (err, results, fields) => {
            console.log(results)
            // console.log(fields)
            res.send(results)
        }

    )
})

app.post('/usuarios', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)
    
    const sql = `
    INSERT INTO tb_usuario 
    (idCPF, nome, tel_residencial, date_nascimento, senha) 
    VALUES (?,?,?,STR_TO_DATE(?,"%d/%m/%Y"),?)`

    const {
        idCPF, 
        nome,
        tel_residencial,
        date_nascimento,
        senha
    } = req.body

    let values = [
        idCPF, 
        nome,
        tel_residencial,
        date_nascimento,
        senha
    ]
    
    connection.execute(
        sql,
        values,
        (err, results, fields) => {
            if(err){
                res.send(err)
            }else{
                res.send(201)
            }
        }
    )
})

app.delete('/usuarios', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)
    
    const sql = `
    DELETE FROM tb_usuario WHERE idCPF = ?`

    const idCPF = req.body.idCPF

    let values = [idCPF]

    connection.execute(
        sql,
        values,
        (err, results, fields) => {
            if(err){
                res.send(err)
            }else{
                res.send(idCPF)
            }
        }
    )

})

app.patch('/usuarios', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)
    
    const sql = `
    UPDATE tb_usuario 
    SET 
    nome=?, 
    tel_residencial=?,
    date_nascimento=STR_TO_DATE(?,"%d/%m/%Y"),
    senha=?
    WHERE idCPF = ?`

    const {
        idCPF, 
        nome,
        tel_residencial,
        date_nascimento,
        senha
    } = req.body

    let values = [
        nome,
        tel_residencial,
        date_nascimento,
        senha,
        idCPF 
    ]

    connection.execute(
        sql,
        values,
        (err, results, fields) => {
            if(err){
                res.send(err)
            }else{
                res.send(idCPF)
            }
        }
    )

})

function verifyJWT (req, res, next){
    const token = req.headers['x-access-token']
    jwt.verify(token, SECRET, function (err, decoded){
        if(err){
            return res.status(500).json({auth:false, message: 'Ocorreu um erro'})
        }else {
            console.log(decoded)
            next()
        }
    })

    
}


// app.patch()

const porta = 4000

app.listen (porta, () => console.log(`Em execução. Porta: ${porta}.`))