const {Schema, model, Types} = require('mongoose')


const Comments = new Schema({
    comments: [{type: Types.ObjectId, ref: "comment"}]
})

const Comment = new Schema({
    user: [{type: Types.ObjectId, ref: "users"}],
    message: String
})
module.exports.Comments = model('comments', Comments)
module.exports.Comments = model('comment', Comment)
