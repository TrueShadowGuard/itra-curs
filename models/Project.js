const {Schema, model, Types} = require('mongoose')


const Project = new Schema({
    name: {type: String, required: true},
    preview: {type: String, default: "https://res.cloudinary.com/dngrbvlvm/image/upload/v1621006137/hrnxe0tbi2cvehvkikan.png"},
    textPreview: {type: String, required: true},
    category: {type: String, required: true},
    bonuses: [{type: Types.ObjectId, ref: 'bonuses', required: true}],
    video: {type: String, required: true},
    totalMoney: {type: Number, required: true},
    money: {type: Number, required: true},
    description: {type: String, required: true},
    news: [{type: Types.ObjectId, ref: 'news', required: true}],
    comments: [{type: Types.ObjectId, ref: 'comments'}],
    id: {type: Number, required: true},
    creatingDate: {type: Date, default: new Date},
    endingDate: {type: Date, required: true}
})


module.exports = model('projects', Project)
