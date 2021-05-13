const cloudinary = require('../config/cloudinary')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const User = require('../models/User')
const Project = require('../models/Project')
const getNextSeqVal = require('../utils/getNextSeqVal')
const {News} = require("../models/News")

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
            const {name, category, money, video, description, date, bonuses, imagePreview, textPreview} = req.body

            if (imagePreview) {
                var response = await cloudinary.uploader.upload(imagePreview, {
                        overwrite: true,
                        invalidate: true,
                        width: 810, height: 456, crop: "fill"
                    },
                    function (error) {
                        console.error(error)
                    })
            }

            const news = new News([])
            await news.save()

            const newProject = new Project({
                name,
                category,
                bonuses,
                video,
                textPreview,
                totalMoney: money,
                money: 0,
                description,
                endingDate: date,
                news,
                id: await getNextSeqVal('projects')
            })
            if (imagePreview) newProject.preview = response.url
            await newProject.save()

            const user = await User.findOne({id});
            user.projects.push(newProject._id)
            await user.save()
            return res.status(200).json({id: newProject.id})
        } catch (e) {
            console.log(e)
            res.status(500).json({message: 'Server error'})
        }
    }
}

module.exports = new projectsController()
