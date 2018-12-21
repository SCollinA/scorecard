const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {HoleSchema} = require('./Holes')

const HoleScoreSchema = new Schema({
    hole: HoleSchema,
    score: Number
})

const HoleScore = mongoose.model('HoleScore', HoleScoreSchema)

module.exports = {HoleScore, HoleScoreSchema}