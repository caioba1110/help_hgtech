const express = require('express')
const utils = require('./utils.js')
require('dotenv').config()

const jwt= require('jsonwebtoken')
const app = express()
app.use(express.json())

const { HOST, USER, PASSWORD, DATABASE, SECRET } = process.env

app.post('/login', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)
    const sql = 'SELECT * from tb_funcionarios WHERE email = ? and senha = ?'
    const {
        email,
        senha

    } = req.body

    let values = [
        email,
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

app.get('/funcionarios', verifyJWT, (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)
    const sql = 'SELECT * from tb_funcionarios'
    connection.query(
        sql,
        (err, results, fields) => {
            console.log(results)
            // console.log(fields)
            res.send(results)
        }

    )
})

app.post('/funcionarios', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)

    const sql = `
    INSERT INTO tb_funcionarios
    (nome, tel_residencial, email, date_nascimento, id_cargo, senha) 
    VALUES (?,?,?,STR_TO_DATE(?,"%d/%m/%Y"),?,?)`

    const {
        nome,
        tel_residencial,
        email,
        date_nascimento,
        id_cargo,
        senha
    } = req.body

    let values = [
        nome,
        tel_residencial,
        email,
        date_nascimento,
        id_cargo,
        senha
    ]

    connection.execute(
        sql,
        values,
        (err, results, fields) => {
            if (err) {
                res.send(err)
            } else {
                res.send(201)
            }
        }
    )
})

app.delete('/funcionarios', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)

    const sql = `
    DELETE FROM tb_funcionarios WHERE id_cod = ?`

    const idcod = req.body.idcod

    let values = [idcod]

    connection.execute(
        sql,
        values,
        (err, results, fields) => {
            if (err) {
                res.send(err)
            } else {
                res.send("Excluido com sucesso")
            }
        }
    )

})

app.patch('/funcionarios', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)

    const sql = `
    UPDATE tb_funcionarios 
    SET 
    nome=?,
    tel_residencial=?,
    email=?,
    date_nascimento=STR_TO_DATE(?,"%d/%m/%Y"),
    id_cargo=?,
    senha=?
    WHERE id_cod = ?`

    const {
        nome,
        tel_residencial,
        email,
        date_nascimento,
        id_cargo,
        senha,
        id_cod
    } = req.body

    let values = [
        nome,
        tel_residencial,
        email,
        date_nascimento,
        id_cargo,
        senha,
        id_cod
    ]

    connection.execute(
        sql,
        values,
        (err, results, fields) => {
            if (err) {
                res.send(err)
            } else {
                res.send("Alteração realizada")
            }
        }
    )

})

app.get('/cargos', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)
    const sql = 'SELECT * from tb_cargos'
    connection.query(
        sql,
        (err, results, fields) => {
            console.log(results)
            // console.log(fields)
            res.send(results)
        }

    )
})

app.post('/cargos', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)

    const sql = `
    INSERT INTO tb_cargos
    (nome_cargo)
    VALUES (?)`

    const {
        nomeCargo
    } = req.body

    let values = [
        nomeCargo
    ]

    connection.execute(
        sql,
        values,
        (err, results, fields) => {
            if (err) {
                res.send(err)
            } else {
                const sql = 'SELECT * from tb_cargos'
                connection.query(
                    sql,
                    (err, results, fields) => {
                        res.send(results)
                    }

                )
            }
        }
    )
})

app.delete('/cargos', (req, res) => {
    connection = utils.create_connection(HOST, USER, PASSWORD, DATABASE)

    const sql = `
    DELETE FROM tb_cargos WHERE id_cargo = ?`

    const idCargo = req.body.idCargo

    let values = [idCargo]

    connection.execute(
        sql,
        values,
        (err, results, fields) => {
            console.log(err)
            console.log(results)
            console.log(results.affectedRows)
            if (results.affectedRows == 0) {
                res.send("Item não encontrado ou já foi excluido")
            } else {
                res.send("Excluido com sucesso")
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

const porta = 5000

app.listen(porta, () => console.log(`Em execução. Porta: ${porta}.`))