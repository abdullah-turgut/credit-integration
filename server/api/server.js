const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const typeFormRouter = require('./TypeForm/typeform.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/', typeFormRouter);

module.exports = server;
