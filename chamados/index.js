const express = require('express')
const mysql = require('mysql2')
const app = express()
app.use(express.json())
app.get('/tb_chamado', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'chamado_hgtech',
        password: '270864letras'
    })

    connection.query('SELECT * FROM tb_chamado', (err, results, fields) => {
        res.json(results)
    })
    })
    const porta = 3000
    app.listen(porta, () => console.log(`porta em execucao ${porta}`))

    app.post('/tb_chamado', (req, res) => {
        const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'chamado_hgtech',
        password: '270864letras'

    })
    const id_chamado = req.body.id_chamado
    const Titulo_chamado = req.body.Titulo_chamado
    const Ds_chamado = req.body.Ds_chamado
    const Usuario_idCpf = req.body.Usuario_idCpf
    const Funcionario_id_codigo_funcionario = req.body.Funcionario_id_codigo_funcionario
    const Funcionario_Cargo_idCargo = req.body.Funcionario_Cargo_idCargo
    const sql = "INSERT INTO tb_chamado (id_chamado, Titulo_chamado, Ds_chamado, Usuario_idCpf, Funcionario_id_codigo_funcionario, Funcionario_Cargo_idCargo) VALUES (" + id_chamado + ", '" + Titulo_chamado +"', '"+ Ds_chamado +"', " + Usuario_idCpf + ", " + Funcionario_id_codigo_funcionario + " , " + Funcionario_Cargo_idCargo + ")"
    connection.query(sql, (err, results, fields) => {
    console.log(results)
    console.log(fields)
    res.send('command executed successfully')

    })
    })

