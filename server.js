const express = require('express');

const accountRouter = require('./accounts/account-router');

const server = express();

server.use(express.json());

server.use( '/api/', accountRouter );

module.exports = server;