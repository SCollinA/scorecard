const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {CourseScoreSchema, CourseScore} = require('./CourseScores')
const {HoleScore} = require('./HoleScores')
const {Course} = require('./Courses')
const {Golfer} = require('./Golfers')

const GroupSchema = new Schema({
    // holds the current course scores for current group
    courseScores: [CourseScoreSchema]
})



const Group = mongoose.model('Group', GroupSchema)

module.exports = {Group, GroupSchema}