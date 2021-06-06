const server = require('./src');
const config = require('config')

server.create(config.get('server'));
server.start();