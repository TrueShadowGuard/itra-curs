const cloudinary = require('../config/cloudinary')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const User = require('../models/User')
const Project = require('../models/Project')
const Bonus = require('../models/Bonus')
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
            const {
                name,
                category,
                money,
                video,
                description,
                date,
                bonuses,
                imagePreview,
                textPreview,
                images
            } = req.body

            if (imagePreview) {
                var response = await uploadToCloudinary(imagePreview)
            }
            const imageURLs = []
            for (let image of images) {
                imageURLs.push(await uploadToCloudinary(image))
            }
            const news = new News([])
            await news.save()

            const mongoBonuses = []

            for (const bonus of bonuses) {
                const mongoBonus = new Bonus({...bonus})
                await mongoBonus.save()
                mongoBonuses.push(mongoBonus)
            }

            const newProject = new Project({
                name,
                category,
                bonuses: mongoBonuses,
                video,
                textPreview,
                totalMoney: money,
                money: 0,
                description,
                endingDate: date,
                images: imageURLs,
                news,
                id: await getNextSeqVal('projects')
            })

            if (imagePreview) newProject.preview = response
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

    async editProject(req, res) {
        const {values, id} = req.body

        try {
            const user = await User.findOne({id: req.user.id}).populate('projects')
            const project = user.projects.some(project => project.id === +id)
            if (!project) return res.status(406).json({message: 'Failed'})

            const {
                name,
                category,
                totalMoney,
                video,
                description,
                endingDate,
                bonuses,
                imagePreview,
                textPreview,
                images
            } = values

            if (imagePreview) {
                var preview = await uploadToCloudinary(imagePreview)
            }
            const imageURLs = []
            for (let image of images) {
                imageURLs.push(await uploadToCloudinary(image))
            }

            const news = new News([])
            await news.save()

            const mongoBonuses = []

            for (const bonus of bonuses) {
                const mongoBonus = new Bonus({...bonus})
                const candidate = await Bonus.findOne({_id: mongoBonus._id})
                if(candidate) {
                    mongoBonuses.push(candidate)
                } else {
                    await mongoBonus.save()
                    mongoBonuses.push(mongoBonus)
                }
            }

            const newProject = {
                name,
                category,
                bonuses: mongoBonuses,
                video,
                textPreview,
                totalMoney: totalMoney,
                description,
                endingDate,
                images: imageURLs,
                news,
            }

            if (imagePreview) newProject.preview = preview

            await Project.findOneAndUpdate({id}, newProject)
            return res.status(200).json({id})
        } catch (e) {
            console.error(e)
            return res.status(500)
        }
    }
}

async function uploadToCloudinary(image) {
    const res = await cloudinary.uploader.upload(image, {
            overwrite: true,
            invalidate: true,
            width: 810, height: 456, crop: "fill"
        },
        function (error) {
            console.error(error)
        })
    return res.url
}

module.exports = new projectsController()
