const {Schema, model, Types} = require('mongoose')


const Project = new Schema({
    name: {type: String, required: true},
    bonuses: [{type: Types.ObjectId, ref: 'bonuses', required: true}],
    video: {type: String, required: true},
    totalMoney: {type: Number, required: true},
    money: {type: Number, required: true},
    description: {type: String, required: true},
    news: [{type: Types.ObjectId, ref: 'news'}],
    comments: [{type: Types.ObjectId, ref: 'comments'}],
    id: {type: Number, required: true}
})


module.exports = model('projects', Project)
