const express = require("express")

const noteControllers = require("../controllers/NoteController")
const validateToken = require("../middlewares/ValidateToken")

const router = new express.Router()

router.post('/notes/create',validateToken, noteControllers.creatNote)

module.exports = router