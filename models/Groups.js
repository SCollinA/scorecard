const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {CourseScoreSchema} = require('./CourseScores')

const GroupSchema = new Schema({
    courseScores: [CourseScoreSchema]
})


const Group = mongoose.model('Group', GroupSchema)

module.exports = {Group, GroupSchema}