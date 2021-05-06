const Project = require('../models/Project')
const {Comment} = require('../models/Comments')
const {EventEmitter} = require('events')

const emitter = new EventEmitter()

class projectsController {
    async getProjects(req, res) {
        const q = req.params.q
        console.log(q)
        if(q === undefined) return res.json(await Project.find({}))
        if(q.length < 3) return res.status(506).json({message: 'Server error'})
        console.log(req.params)
        const result = await Project.find({
            name: {
                $regex: new RegExp(req.params.q, 'gi')
            }
        })
        console.log(result)
        res.json(result)
    }

    async getProject(req, res) {
        const result = await Project.findOne({id: req.params.id})
            .populate('bonuses')
            .populate('comments')
        res.json(result)
    }

    async sendMessage(req, res) {
        const {name, id} = req.user
        const projectId = req.params.id
        try {
            const project = await Project.findOne({id: +projectId})
            const comment = new Comment({userId: id, userName: name, message: req.body.message})
            await comment.save()
            await project.update({comments: [...project.comments, comment._id]})

            res.status(200).json({message: 'Success'})
            emitter.emit('message')
        } catch (e) {
            console.log(e)
        }
    }

    async getComments(req, res) {
        try {
            emitter.on('message', async () => {
                const comments = (await Project.findOne({id: req.params.id}).populate('comments')).comments
                res.json(comments)
            })
        } catch (e) {
            console.log(e)
        }
    }
    async sendMoney(req, res) {
        const amount = req.body.amount
        if (!amount || amount != +amount) return res.status(400).json({message: 'Invalid amount'})
        try {
            const project = await Project.findOne({id: req.params.id})
            await Project.updateOne({id: req.params.id}, {money: project.money + +amount})
            res.status(200).json({message: 'Success'})
        } catch (e) {
            res.status(500).json({message: 'Server error. Please try again later'})
        }
    }
}

module.exports = new projectsController()
