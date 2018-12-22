const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {CourseScoreSchema} = require('./CourseScores')

const GolferSchema = new Schema({
    name: String,
    courseScores: [CourseScoreSchema],
})

GolferSchema.statics.groupFromCourseAndGolfers = function(course, golfers) {
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
                return Golfer.findByIdAndUpdate(
                    golfer.id, 
                    {
                        courseScores: [
                            ...golfer.courseScores, 
                            newCourseScore
                        ], 
                        currentCourseScore: newCourseScore
                    }, 
                    {new: true}
                )
            }))
        })
    })
}

const Golfer = mongoose.model('Golfer', GolferSchema)

module.exports = {Golfer, GolferSchema}