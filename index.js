const express = require('express')
const mongoose = require('mongoose')
const {Types} = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const Bonus = require('./models/Bonus')
const Project = require('./models/Project')
const Counter = require('./models/Counter')
const User = require('./models/User')
const authRouter = require('./routes/authRouter')
const projectsRouter = require('./routes/projectsRouter')
const profileRouter = require('./routes/profileRouter')
const getNextSeqVal = require('./utils/getNextSeqVal')

const PORT = process.env.PORT || 3001
const app = express()
const config = require('./config');

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/auth/', authRouter)
app.use('/api/projects/', projectsRouter)
app.use('/api/profile', profileRouter)


const start = async () => {
    try {
        await mongoose.connect(config.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch
        (e) {
        console.log(e)
    }
}

start()

