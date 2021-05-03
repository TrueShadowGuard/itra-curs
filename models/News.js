const {Schema, model, Types} = require('mongoose')


const News = new Schema({
    posts: [{type: Types.ObjectId, ref: "posts"}]
})

const Post = new Schema({
    message: String,
    date: {type: Date, default: new Date()},
})
module.exports.News = model('news', News)
module.exports.Post = model('posts', Post)
