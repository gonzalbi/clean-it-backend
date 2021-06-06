const express = require('express');
const apiRoutes = require('./api')
const router = express.Router();

const init = (server) => {
    server.use("/",apiRoutes)
}

module.exports = {
    init
}