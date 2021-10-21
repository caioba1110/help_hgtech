const express = require ('express')
const utils = require ('./utils.js')


const app = express()
app.use(express.json())

app.get('/usuarios', (req, res) => {
    connection = utils.create_connection()
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
    connection = utils.create_connection()

    const sql = 'INSERT INTO tb_usuario (idCPF, nome, tel_residencial, date_nascimento, senha) VALUES (?,?,?,?,?)'

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
            res.send(results)
        }
    )
})

// app.patch()

// app.delete()

const porta = process.env.PORT || 3000

app.listen (porta, () => console.log(`Em execução. Porta: ${porta}.`))