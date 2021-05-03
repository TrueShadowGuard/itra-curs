const {Schema, model, Types} = require('mongoose')


const User = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    bonuses: [{type: Types.ObjectId, ref: 'bonuses', required: true}],
    projects: [{type: Types.ObjectId, ref: 'projects', required: true}],
    id: {type: Number, required: true}
})

module.exports = model('User', User)
