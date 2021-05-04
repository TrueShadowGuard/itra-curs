const {Schema, model, Types} = require('mongoose')


const Comments = new Schema({
    comments: [{type: Types.ObjectId, ref: "comment"}]
})

const Comment = new Schema({
    userId: String,
    userName: String,
    message: String
})
module.exports.Comments = model('comments', Comments)
module.exports.Comment = model('comment', Comment)
