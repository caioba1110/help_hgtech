const mysql = require ('mysql2')

function create_connection(){
    const connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'usuario_hgtech'
    })

    return connection
}

module.exports = {
    create_connection
}