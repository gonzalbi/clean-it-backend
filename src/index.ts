const express = require('express')
const server = express()
const routes = require('./routes')
const config = require('config')

let create = () => {
    //SET SERVER SETTINGS
    const port = config.get("server").port
    const hostname = config.get("server").hostname

    server.set('port', port)
    server.set('hostname', hostname)

    //JSON parse
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }));
    server.use('/img', express.static(__dirname + '/assets/img'))

    routes.init(server)
}

let start = () => {
    const hostname = server.get('hostname')
    const port = server.get('port')

    server.listen(port,console.log(`Server listening on http://${hostname}:${port}`))
}

create();
start();

