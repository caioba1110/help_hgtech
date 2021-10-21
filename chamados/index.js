const express = require('express')
const mysql = require('mysql2')
const app = express()
app.use(express.json())
app.get('/chamados', (req, res) => {
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'chamado_hgtech',
        password: '270864letras'

    })
        connection.query('SELECT * FROM tb_chamado', (err, results, fields) => {
            console.log(results)
            console.log(fields)
            res.send('command executed successfully')
        })

   

})
const porta = 3000
app.listen(porta, () => console.log(`porta em execucao ${porta}`))

