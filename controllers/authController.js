const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const getNextSeqVal = require('../utils/getNextSeqVal')
const {validationResult} = require('express-validator')
const {secret} = require("../config")

const generateAccessToken = (id, name) => {
    const payload = {
        id,
        name
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            let {email, password, name} = req.body;
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким email уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({
                name,
                email,
                password: hashPassword,
                bonuses: [],
                projects: [],
                id: await getNextSeqVal('users'),
            })
            await user.save()
            return res.json({message: "Пользователь успешно зарегистрирован"})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${email} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            if (user.banned) {
                res.json({message: 'banned'})
            }
            const token = generateAccessToken(user.id, user.name)
            return res.json({token, id: user.id, name: user.name})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}

module.exports = new authController()
