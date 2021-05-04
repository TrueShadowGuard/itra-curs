const Project = require('../models/Project')
const {Comment} = require('../models/Comments')
const {EventEmitter} = require('events')

const emitter = new EventEmitter()

class projectsController {
    async getProjects(req, res) {
        const result = await Project.find()
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
}

module.exports = new projectsController()
