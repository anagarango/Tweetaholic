const mongoose = require('mongoose')

var reportedSchema = new mongoose.Schema({
    author: mongoose.SchemaTypes.ObjectId,
    idReport: String,
    title: String,
    body: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

var reports = mongoose.model('TestingReport', reportedSchema)
var createNewSchema = mongoose.models.reportedSchema
module.exports = createNewSchema || reports