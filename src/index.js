const express = require('express')
const server = express()
const routes = require('./routes')

let create = (config) => {
    server.set('port', config.port)
    server.set('hostname', config.hostname)

    routes.init(server)
}

let start = () => {
    const hostname = server.get('hostname')
    const port = server.get('port')

    server.listen(port,console.log(`Server listening on http://${hostname}:${port}`))
}

module.exports = {
    create,
    start
}


