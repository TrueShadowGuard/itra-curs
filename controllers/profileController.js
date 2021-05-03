const mongoose = require('mongoose')
const mongodb = require('mongodb')
const User = require('../models/User')
const Project = require('../models/Project')
const getNextSeqVal = require('../utils/getNextSeqVal')
const {News} = require("../models/News");

class projectsController {
    async getProfile(req, res) {
        const result = await User.findOne({id: req.params.id},
            {email: 0, password: 0, _id: 0, __v: 0})
            .populate('bonuses')
            .populate('projects')

        res.json(result)
    }

    async createProject(req, res) {
        try {
            const {id} = req.user
            const {name, money, video, description, date, bonuses} = req.body
            const news = await new News([])

            const newProject = new Project({
                name,
                bonuses,
                video,
                totalMoney: money,
                money: 0,
                description,
                endingDate: date,
                news,
                id: await getNextSeqVal('projects')
            })
            await newProject.save()
            const user = await User.findOne({id});
            user.projects.push(newProject._id)
            await User.updateOne({
                id
            }, {projects: user.projects}, { upsert: true });
            return res.status(200).json({id: newProject.id})
        } catch(e) {
            console.log(e)
            res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new projectsController()
