const express = require("express");
const Lessons = require("../models/dbHelpers");

const router = express.Router();

router.get('/', (req, res) => {
    Lessons.findAllContacts()
        .then(contacts => {
            res.status(200).json(contacts)
        })
        .catch(error => {
            res.status(500).json({ message: "Unable to retrieve contacts" });
        });
});

module.exports = router;