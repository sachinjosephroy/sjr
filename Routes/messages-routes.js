const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    Lessons.removeMessage(id)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `Record with id: ${id} has been deleted` });
            } else {
                res.status(404).json({ message: `There is no record with the id: ${id}` });
            }
        })
        .catch(error => {
            res.status(500).json({ message: 'Error' });
        });
});

module.exports = router;