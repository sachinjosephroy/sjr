const express = require('express');
const cors = require('cors');

const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const usersRouter = require('../Routes/users-routes');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/api/lessons', lessonsRouter);
server.use('/api/messages', messagesRouter);
server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
    res.json({ message: "Testing" });
});

module.exports = server;