const express = require("express")

const user = require("../controllers/UserController")

const router = new express.Router()

router.post('/users/register', user.createUser)

module.exports = router