var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var pollSchema = new Schema({
    title: String,
    desc: String,
    createdBy: Schema.Types.Mixed,
    choice: Schema.Types.Mixed,
    open:Boolean,
    openAt:Date,
    closedAt:Date,
    alreadyvote:Schema.Types.Mixed
});

var Poll = mongoose.model("Poll",pollSchema)
module.exports = Poll
