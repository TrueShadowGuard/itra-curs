const {Schema, model, Types} = require('mongoose')


const Bonus = new Schema({
    projectName: {type: String, required: true},
    image: {type: String, required: false},
    name: {type: String, required: true},
    money: {type: String, required: true},
    description: {type: String, required: true}
})

module.exports = model('bonuses', Bonus)
