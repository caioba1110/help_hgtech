const express = require('express')
const app = express()
//requerindo uma conexão http para criar o  servidor conexão
const http = require('http').createServer(app)

//Minha porta  3000
const PORT = process.env.PORT || 3000

//Está ouvindo a porta
http.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Socket está a exigir uma  requisição estabelecer um conexão
const io = require('socket.io')(http)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})