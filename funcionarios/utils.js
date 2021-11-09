const mysql = require ('mysql2')

function create_connection(host, user, password, database){
    const connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    })

    return connection
}

module.exports = {
    create_connection
}