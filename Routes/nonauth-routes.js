const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router();

router.post('/contact', (req, res) => {
    console.log(req.body);
    Lessons.addContact(req.body)
        .then(contact => {
            res.status(201).json(contact)
        })
        .catch(error => {
            res.status(500).json({ message: 'Cannot add contact' });
        });
});

module.exports = router;