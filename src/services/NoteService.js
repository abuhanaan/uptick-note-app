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



const noteServices = {
    createNote: createNote
}

module.exports = noteServices