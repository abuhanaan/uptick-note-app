const express = require("express")
const sequelize = require("./db/connect")
const app = require('./app')

// Import Routers
const userRouter = require("./routers/UserApi")
const noteRouter = require("./routers/NoteApi")

const port = process.env.PORT || 7000

// App Routers
app.use('/api/v1', userRouter)
app.use('/api/v1', noteRouter)

async function startDatabase() {
    try {
        await sequelize.sync()

        console.log('Connected to Database successfully!')
    } catch (error) {
        console.log(error)
    }
}

app.listen(port, async () => {
    console.log('Server is up on port ' + port)
    await startDatabase()
})