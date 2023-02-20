const noteServices = require("../services/NoteService");

const creatNote = async (req, res) => {
    const response = await noteServices.createNote(req, res)

    return response
}

const noteControllers = {
    creatNote: creatNote
}

module.exports = noteControllers