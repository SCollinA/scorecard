const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {CourseScoreSchema} = require('./CourseScores')

const GolferSchema = new Schema({
    name: String,
    courseScores: [CourseScoreSchema],
    currentCourseScore: CourseScoreSchema
})

const Golfer = mongoose.model('Golfer', GolferSchema)

module.exports = {Golfer, GolferSchema}