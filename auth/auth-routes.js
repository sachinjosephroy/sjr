const express = require("express");
const Lessons = require("../models/dbHelpers");
const bcrypt = require('bcryptjs');
const generateToken = require('./generateToken');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post('/register', (req, res) => {
    const credentials = req.body;
    const { username, password } = credentials

    if (!username && password) {
        return res.status(400).json({ message: 'Username and password required' });
    }

    const hash = bcrypt.hashSync(credentials.password, 12);
    credentials.password = hash;

    Lessons.addUser(credentials)
        .then(user => {
            res.status(200).json(user)
        })
        .catch(error => {
            if (error.errno = 19) {
                res.status(400).json({ message: 'Username already taken' });
            } else {
                res.status(500).json(error);
            }
        });
});

router.post("/login", (req, res) => {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);

    if (!(username && password)) {
        return res.status(400).json({ message: "Username and password required" });
    }

    Lessons.findUserByUsername(username)
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
                //const token = generateToken(user);
                const payload = {
                    id: user.id,
                    username: user.username,
                    // can add more non confidential data
                };

                const secret = process.env.SECRET;

                const options = {
                    expiresIn: "1d",
                };

                const token = jwt.sign(payload, secret, options);

                res.status(200).json({ message: `Welcome ${user.username}!`, token });
            } else {
                res.status(401).json({ message: "Invalid credentials" });
            }
        })
        .catch((error) => {
            res.status(500).json(error);
        });
});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({ message: 'You can check out anytime you like, but you can never leave' });
            } else {
                res.status(200).json({ message: 'Successfully logged out' });
            }
        });
    } else {
        res.status(200).json({ message: 'Not logged in' });
    }
});

router.post('/contact', (req, res) => {
    Lessons.addContact(req.body)
        .then(contact => {
            res.status(201).json(contact)
        })
        .catch(error => {
            res.status(500).json({ message: 'Cannot add contact' });
        });
});

router.get('/contacts', (req, res) => {
    Lessons.findAllContacts()
        .then(contacts => {
            res.status(200).json(contacts)
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to retrieve contacts" });
        });
});

module.exports = router;