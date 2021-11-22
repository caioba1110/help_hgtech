require("dotenv").config()
const express = require('express')
const mysql = require('mysql2')
const app = express()
const { HOST, USER, PASSWORD, DATABASE } = process.env

app.use(express.json())
app.get('/tb_chamado', (req, res) => {
    const connection = mysql.createConnection({
        host: HOST,
        user: USER,
        database: DATABASE,
        password: PASSWORD
    })

    connection.query('SELECT * FROM tb_chamado', (err, results, fields) => {
        res.json(results)
    })
})

// faz a inser dos chamados pelo método POST
app.post('/tb_chamado', (req, res) => {
    const connection = mysql.createConnection({
        host: HOST,
        user: USER,
        database: DATABASE,
        password: PASSWORD

    })
    const id_chamado = req.body.id_chamado
    const Titulo_chamado = req.body.Titulo_chamado
    const Ds_chamado = req.body.Ds_chamado
    const Usuario_idCpf = req.body.Usuario_idCpf
    const Funcionario_id_codigo_funcionario = req.body.Funcionario_id_codigo_funcionario
    const Funcionario_Cargo_idCargo = req.body.Funcionario_Cargo_idCargo
    const sql = "INSERT INTO tb_chamado (id_chamado, Titulo_chamado, Ds_chamado, Usuario_idCpf, Funcionario_id_codigo_funcionario, Funcionario_Cargo_idCargo) VALUES (" + id_chamado + ", '" + Titulo_chamado + "', '" + Ds_chamado + "', " + Usuario_idCpf + ", " + Funcionario_id_codigo_funcionario + " , " + Funcionario_Cargo_idCargo + ")"
    connection.query(sql, (err, results, fields) => {
        console.log(err)
        console.log(results)
        console.log(fields)
        res.send('command executed successfully')

    })
})

// Faz o delete dos chamados pelos ids
app.delete('/tb_chamado', (req, res) => {
    const connection = mysql.createConnection({
        host: HOST,
        user: USER,
        database: DATABASE,
        password: PASSWORD
    })

    const id_chamado = req.body.id_chamado
    const sql = "DELETE FROM tb_chamado WHERE id_chamado = " + id_chamado
    connection.query(sql, (err, results, fields) => {
        console.log(results)
        console.log(fields)
        res.send('command executed successfully')

    })
})

app.put('/tb_chamado', (req, res) => {
    const connection = mysql.createConnection({
        host: HOST,
        user: USER,
        database: DATABASE,
        password: PASSWORD
    })

    const id_chamado = req.body.id_chamado
    const Titulo_chamado = req.body.Titulo_chamado
    const Ds_chamado = req.body.Ds_chamado
    const Usuario_idCpf = req.body.Usuario_idCpf
    const Funcionario_id_codigo_funcionario = req.body.Funcionario_id_codigo_funcionario
    const Funcionario_Cargo_idCargo = req.body.Funcionario_Cargo_idCargo
    //const sql = "UPDATE tb_chamado SET Titulo_chamado = " + Titulo_chamado + ", Ds_chamado = " + Ds_chamado +  ", Usuario_idCpf = " + Usuario_idCpf + ", Funcionario_id_codigo_funcionario = " + Funcionario_id_codigo_funcionario + ", Funcionario_Cargo_idCargo = " + Funcionario_Cargo_idCargo + "  WHERE id_chamado =" + id_chamado

    const sql = `UPDATE tb_chamado SET Titulo_chamado=?,
    Ds_chamado = ?,
    Usuario_idCpf =?,
    Funcionario_id_codigo_funcionario=?,
    Funcionario_Cargo_idCargo=?
    WHERE id_chamado=?`
    let values = [
        Titulo_chamado,
        Ds_chamado,
        Usuario_idCpf,
        Funcionario_id_codigo_funcionario,
        Funcionario_Cargo_idCargo,
        id_chamado
    ]
    connection.query(sql, values, (err, results, fields) => {
        console.log(results)
        //console.log(fields)
        res.send('command executed successfully')


    })
})

const porta = 3000
app.listen(porta, () => console.log(`porta em execucao ${porta}`))





