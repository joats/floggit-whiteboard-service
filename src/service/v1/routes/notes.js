const express = require('express');

const notesController = require('../controllers/notes');

const router = express.Router();

router.get('/', notesController.getAll);
router.get('/:id', notesController.get);
router.delete('/:id', notesController.remove);
router.post('/', notesController.add);

module.exports = router;
