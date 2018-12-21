const mongoose = require('mongoose')
const Schema = mongoose.Schema

const HoleSchema = new Schema({
    number: Number,
    par: Number
})

const Hole = mongoose.model('Hole', HoleSchema)

module.exports = {Hole, HoleSchema}