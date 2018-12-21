const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {HoleScoreSchema} = require('./HoleScores')

const CourseScoreSchema = new Schema({
    holeScores: [HoleScoreSchema],
})

const CourseScore = mongoose.model('CourseScore', CourseScoreSchema)

module.exports = {CourseScore, CourseScoreSchema}