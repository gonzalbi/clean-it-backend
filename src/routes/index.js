const apiRoutes = require('./api')

const init = (server) => {
    server.use("/",apiRoutes)
}

module.exports = {
    init
}