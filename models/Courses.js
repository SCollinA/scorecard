const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {HoleSchema} = require('./Holes')
const {CourseScoreSchema} = require('./CourseScores')

const CourseSchema = new Schema({
    name: String,
    holes: [HoleSchema],
    scores: [CourseScoreSchema],
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = {Course, CourseSchema}