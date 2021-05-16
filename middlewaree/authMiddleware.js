const jwt = require('jsonwebtoken')
const {secret} = require('../config/mongo')
const User = require('../models/User')

module.exports = function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: 'Unauthorized'})
        }
        const decodedData = jwt.verify(token, secret)

        User.findOne({id: decodedData.id, banned: true}).then(banned => {
            if(banned) return res.status(400).json({message: 'Unauthorized'})
            req.user = decodedData
            next()
        })
    } catch (e) {
        console.log(e)
        return res.status(401).json({message: 'Unauthorized'})
    }
};
