const Project = require('../models/Project')
const User = require('../models/User')
const {Types} = require("mongoose");
const {Comment} = require('../models/Comments')
const {EventEmitter} = require('events')

const emitter = new EventEmitter()

const MAX_COUNT_PER_PAGE = 8

class projectsController {
    async getProjects(req, res) {
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
            project.comments.push(comment)
            await project.save()
            res.status(200).json({message: 'Success'})
        } catch (e) {
            console.log(e)
        }
    }

    async getComments(req, res) {
        try {
            const comments = (await Project.findOne({id: req.params.id}).populate('comments')).comments
            return res.json(comments)
        } catch (e) {
            console.error(e)
        }
    }

    async sendMoney(req, res) {
        const {amount, bonusId} = req.body
        let user = req.user
        if (!amount || amount != +amount) return res.status(400).json({message: 'Invalid amount'})
        try {
            const project = await Project.findOne({id: req.params.id})
            project.money += +amount
            await project.save()
            if (bonusId) {
                user = await User.findOne({id: user.id})
                user.bonuses.push(Types.ObjectId(bonusId))
                await user.save()
            }
            res.status(200).json({message: 'Success'})
        } catch (e) {
            console.error(e)
            res.status(500).json({message: 'Server error. Please try again later'})
        }
    }

    async deleteProject(req, res) {
        const deletingProjectId = req.body.id
        const user = await User.findOne({id: req.user.id}).populate('projects')
        if (user.projects.some(project => project.id === deletingProjectId)) {
            await Project.deleteOne({id: deletingProjectId})
            return res.status(200).json('Success')
        }
        return res.status(403)
    }
}

module.exports = new projectsController()
