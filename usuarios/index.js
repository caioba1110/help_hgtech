const express = require ('express')
const utils = require ('./utils.js')
require ('dotenv').config()

const app = express()
app.use(express.json())

const {HOST, USER, PASSWORD, DATABASE} = process.env

app.get('/usuarios', (req, res) => {
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

// app.patch()

const porta = 4000

app.listen (porta, () => console.log(`Em execução. Porta: ${porta}.`))