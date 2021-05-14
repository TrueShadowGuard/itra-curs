const Project = require('../models/Project')
const User = require('../models/User')
const {Comment} = require('../models/Comments')
const {EventEmitter} = require('events')

const emitter = new EventEmitter()

const MAX_COUNT_PER_PAGE = 8

class projectsController {
    async getProjects(req, res) {
        console.log(req.query)
        const {q, page = 0, count = MAX_COUNT_PER_PAGE} = req.query
        if (q?.length < 3) return res.status(506).json({message: 'Server error'})
        const filter = q === 'null' ? {} : {
            name: {$regex: new RegExp(q, 'i')}
        }
        return res.json(await Project.find(filter).skip(page * count).limit(+count || MAX_COUNT_PER_PAGE))
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

    async deleteProject(req, res) {
        const deletingProjectId = req.body.id
        const user = await User.findOne({id: req.user.id}).populate('projects')
        console.log('user:', user)
        console.log('deleteProject', deletingProjectId)
        if(user.projects.some(project => project.id === deletingProjectId)) {
            await Project.deleteOne({id: deletingProjectId})
            return res.status(200).json('Success')
        }
        return res.status(403)
    }
}

module.exports = new projectsController()
