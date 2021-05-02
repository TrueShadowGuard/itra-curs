const Project = require('../models/Project')

class projectsController {
    async getProjects(req, res) {
        const result = await Project.find()
        res.json(result)
    }

    async getProject(req, res) {
        const result = await Project.findOne({id: req.params.id}).populate('bonuses')
        res.json(result)
    }
}

module.exports = new projectsController()
