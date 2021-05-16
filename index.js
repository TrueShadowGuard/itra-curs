require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const {Types} = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const Bonus = require('./models/Bonus')
const Project = require('./models/Project')
const Counter = require('./models/Counter')
const User = require('./models/User')
const {Comments, Comment} = require('./models/Comments')
const authRouter = require('./routes/authRouter')
const projectsRouter = require('./routes/projectsRouter')
const profileRouter = require('./routes/profileRouter')
const getNextSeqVal = require('./utils/getNextSeqVal')
const cloudinary = require('./config/cloudinary')

const PORT = process.env.PORT || 3001
const app = express()
const config = require('./config/mongo');

app.use(cors())
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

app.use('/api/auth/', authRouter)
app.use('/api/projects/', projectsRouter)
app.use('/api/profile', profileRouter)


const start = async () => {
    try {
        await mongoose.connect(config.mongo, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        // for (let i = 0; i < 30; i++) {
        //     const newProject = new Project({
        //         name: 'Test' + i,
        //         category: 'Science',
        //         bonuses: [],
        //         video: 'https://www.youtube.com/watch?v=_B6N_7tF6MA',
        //         textPreview: 'test',
        //         totalMoney: 10,
        //         money: 0,
        //         description: 'test',
        //         endingDate: new Date(),
        //         news: [],
        //         id: await getNextSeqVal('projects')
        //     })
        //     await newProject.save()
        // }
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch
        (e) {
        console.log(e)
    }
}

start()

