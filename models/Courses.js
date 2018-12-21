const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {HoleSchema} = require('./Holes')
const {CourseScoreSchema} = require('./CourseScores')
const {GolferSchema} = require('./Golfers')

const CourseSchema = new Schema({
    name: String,
    holes: [HoleSchema],
    highScores: [CourseScoreSchema],
})

const Course = mongoose.model('Course', CourseSchema)

module.exports = {Course, CourseSchema}