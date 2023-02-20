const bcrypt = require("bcrypt")
const User = require("../models/user")
const generateAccessToken = require("../utils/generateAccessToken.js")

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body
        // console.log(password)
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

const userLogin = async (req, res) => {
    try {
        const { username, password } = req.body
        console.log(username)
        const user = await User.findOne({where: {username: username}})
        if (!user) {
            const response = {
                success: false,
                status: "Not found",
                message: `User with username "${username}" does not exist in the DB!`
            }
            return res.status(404).send(response)
        }
        else {
            hashedPassword = user.password
            if (await bcrypt.compare(password, hashedPassword)) {
                const token = generateAccessToken({user: user})
                const response = {
                    success: true,
                    status: "Success",
                    message: "User Logged in Successfuly!",
                    data: {
                        token: token
                    }
                }
                return res.status(200).send(response)
            }
            else {
                const response = {
                    success: false,
                    status: "Bad Request",
                    message: "Password Mismatch, Please check your password and try again!"
                }
                return res.status(400).send(response)
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            message: "Internal Server Error"
        })
    }
}

const userServices = {
    createUser: createUser,
    userLogin: userLogin
}

module.exports = userServices