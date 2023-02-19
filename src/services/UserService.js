const bcrypt = require("bcrypt")
const User = require("../models/user")

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(password)
        const hashedPassword = await bcrypt.hash(password, 10)

        const existingUser = await User.findOne({where: {username: username}})
        if (existingUser) {
            const response = {
                success: false,
                status: "Conflict Operation",
                message: `Username "${username}" already exist in the DB, please choose a different one and try again!`
            }
            return res.status(409).send(response)
        }
        else {
            const newUser = await User.create({
                username: username,
                password: hashedPassword
            })
            const response = {
                success: true,
                status: "Success",
                message: "User created successfully",
                data: {
                    id: newUser.id,
                    username: newUser.username
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

const userServices = {
    createUser: createUser
}

module.exports = userServices