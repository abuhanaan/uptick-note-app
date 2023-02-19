const userServices = require("../services/UserService")

async function createUser (req, res) {
    const response = await userServices.createUser(req, res)
    return response
}

const userController = {
    createUser: createUser
}

module.exports = userController