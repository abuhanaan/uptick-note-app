const { response } = require("../app");
const noteServices = require("../services/NoteService");

const creatNote = async (req, res) => {
    const response = await noteServices.createNote(req, res)

    return response
}

const fetchNoteById = async (req, res) => {
    const response = await noteServices.getNote(req, res)

    return response
}

const fetchAllNotes = async (req, res) => {
    const response = await noteServices.getAllNotes(req, res)

    return response
}

const fetchAllMyNotes = async (req, res) => {
    const response = await noteServices.getAllMyNotes(req, res)

    return response
}

const updateMyNote = async(req, res) => {
    const response = await noteServices.updateNote(req, res)

    return response
}

const noteControllers = {
    creatNote: creatNote,
    fetchNoteById: fetchNoteById,
    fetchAllNotes: fetchAllNotes,
    fetchAllMyNotes: fetchAllMyNotes,
    updateMyNote: updateMyNote
}

module.exports = noteControllers