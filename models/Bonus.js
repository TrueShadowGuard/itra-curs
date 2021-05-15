const {Schema, model, Types} = require('mongoose')


const Bonus = new Schema({
    image: {type: String, required: false},
    name: {type: String, required: true},
    money: {type: Number, required: true},
    description: {type: String, required: true}
})

module.exports = model('bonuses', Bonus)
