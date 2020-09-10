const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const lessonsRouter = require('../Routes/lessons-routes');
const messagesRouter = require('../Routes/messages-routes');
const usersRouter = require('../Routes/users-routes');
const contactsRouter = require('../Routes/contacts-routes');
const authRouter = require('../auth/auth-routes');
const nonauthRouter = require('../Routes/nonauth-routes');
const restricted = require('../auth/restricted-middleware');
/* const jwt = require('jsonwebtoken'); */

const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/other', nonauthRouter);
server.use('/api/lessons', restricted, lessonsRouter);
server.use('/api/messages', restricted, messagesRouter);
server.use('/api/users', restricted, usersRouter);
server.use('/api/contacts', restricted, contactsRouter);

/* function restricted(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, process.env.SECRET)
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
} */

server.get('/', (req, res) => {
    res.json({ message: "Testing" });
});

module.exports = server;