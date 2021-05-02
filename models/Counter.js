const {Schema, model} = require('mongoose')


const Counter = new Schema({
    name: {type: String, required: true},
    count: {type: Number, required: true}
})

module.exports = model('counters', Counter)
