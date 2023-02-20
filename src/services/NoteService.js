const Note = require("../models/note");

const createNote = async (req, res) => {
    try {
        const { title, content, author } = req.body
        const existingNote = await Note.findOne({where: {title: title}})
        if (existingNote) {
            const response = {
                success: false,
                status: "Conflict Operation",
                message: `Note with title "${title}" already exist in the DB, please choose a different title and try again!`
            }
            return res.status(409).send(response)
        }

        const note = await Note.create({
            author: req.user.user.username,
            title: title,
            content: content
        })
        return res.status(200).send({
            success: true,
            message: `Note created successfully`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error!"
        })
    }
}

const getNote = async (req, res) => {
    try {
        const noteId = req.params.id
        const note = await Note.findOne({where: {id: noteId}})
        if (!note) {
            const response = {
                success: false,
                status: "Not found",
                message: "This note is not found in the DB"
            }
            return res.status(404).send(response)
        }
        else{
            const response = {
                success: true,
                status: "operation successful",
                message: "Note was recovered successfuly",
                data: {
                    id: note.id,
                    author: note.author,
                    title: note.title,
                    content: note.content
                }
            }
            return res.status(200).send(response)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.findAll()
        if (notes.length == 0) {
            const response = {
                success: false,
                status: "Not found",
                message: "The note table is empty"
            }
            return res.status(404).send(response)
        }
        else {
            const notes_arr = []
            notes.forEach(element => {
                const note = {
                    id: element.id,
                    author: element.author,
                    title: element.title,
                    content: element.content
                }
                notes_arr.push(note)
            });
            const response = {
                success: true,
                status: "operation successful",
                message: "Notes were recovered successfuly",
                data: notes_arr
            }
            return res.status(200).send(response)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const getAllMyNotes = async(req, res) => {
    try {
        const currentUser = req.user.user.username
        const allMyNotes = await Note.findAll({where: {author: currentUser}})
        if (allMyNotes.length == 0) {
            const response = {
                success: false,
                status: "Not found",
                message: "You have not created any note yet!"
            }
            return res.status(404).send(response)
        }
        else{
            const notes_arr = []
            allMyNotes.forEach(element => {
                const note = {
                    id: element.id,
                    author: element.author,
                    title: element.title,
                    content: element.content
                }
                notes_arr.push(note)
            });
            const response = {
                success: true,
                status: "operation successful",
                message: "Your notes were recovered successfuly",
                data: notes_arr
            }
            return res.status(200).send(response)
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const updateNote = async (req, res) => {
    try {
        const { id, content } = req.body
        const currentUser = req.user.user.username
        const note = await Note.findOne({where: {id: id}})

        if (!note) {
            const response = {
                success: false,
                status: "not found",
                message: `The note with id ${id} does not exist`
            }
            return res.status(404).send(response)
        }
        else {
            if (note.author !== currentUser) {
                const response = {
                    success: false,
                    status: "Authorization not granted",
                    message: `You are not authorized to update this note as you are not the autor`
                }
                return res.status(401).send(response)
            }
            else{
                await note.update({content: content})
                const response = {
                    success: true,
                    status: "Update Successful",
                    message: `Your note was updated successfully`
                }
                return res.status(200).send(response)
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const noteServices = {
    createNote: createNote,
    getNote: getNote,
    getAllNotes: getAllNotes,
    getAllMyNotes: getAllMyNotes,
    updateNote: updateNote
}

module.exports = noteServices