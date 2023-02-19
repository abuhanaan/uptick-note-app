const userServices = require("../services/UserService")

async function createUser (req, res) {
    const response = await userServices.createUser(req, res)
    return response
}

async function login (req, res) {
    const response = await userServices.userLogin(req, res)
    return response
}

const userController = {
    createUser: createUser,
    login: login
}

module.exports = userController