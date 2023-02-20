const express = require("express")

const noteControllers = require("../controllers/NoteController")
const validateToken = require("../middlewares/ValidateToken")

const router = new express.Router()

router.post('/notes/create',validateToken, noteControllers.creatNote)

// fetch operations
router.get('/notes/:id', noteControllers.fetchNoteById)
router.get('/notes', noteControllers.fetchAllNotes)
router.get('/mynotes',validateToken, noteControllers.fetchAllMyNotes)

// update operation
router.put('/notes/update', validateToken, noteControllers.updateMyNote)

router.delete('/notes/:id', validateToken, noteControllers.deleteNoteById)

module.exports = router