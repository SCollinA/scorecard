const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {CourseScoreSchema, CourseScore} = require('./CourseScores')
const {HoleScore} = require('./HoleScores')
const {Course} = require('./Courses')
const {Golfer} = require('./Golfers')

const GroupSchema = new Schema({
    courseScores: [CourseScoreSchema]
})

GroupSchema.statics.newGroupFromCourseAndGolfers = function(course, golfers) {
    // get course
    return Course.findById(course.id)
    .then(course => {
        // get holes on course and make new hole score
        return Promise.all(course.holes.map(hole => new HoleScore({hole, score: 0})))
        .then(holeScores => {
            // add course score to golfers
            return Promise.all(golfers.map(golfer => {
                // make new course score from holescores
                const newCourseScore = new CourseScore({holeScores})
                return Golfer.findByIdAndUpdate(golfer.id, {courseScores: [...golfer.courseScores, newCourseScore]})
                .then(() => newCourseScore)
            }))
            .then(courseScores => {
                // make new group
                // add course score to group
                return new Group({courseScores})
            })
        })
    })
}

const Group = mongoose.model('Group', GroupSchema)

module.exports = {Group, GroupSchema}