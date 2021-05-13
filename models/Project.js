const {Schema, model, Types} = require('mongoose')


const Project = new Schema({
    name: {type: String, required: true},
    preview: {type: String, default: "https://lh3.googleusercontent.com/proxy/aucv1PWOW89hpJIhnFiRJ7l4xJkZg_DLBaSOlT82FJSUVrpIZqduZEMmhJ_CLSH8dAOd9e34M32buQwiGr3PiGmwQUjczuKuTZtNiDcrqwYJeKw"},
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
