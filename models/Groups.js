const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {Course, CourseSchema} = require('./Courses')
const {Golfer, GolferSchema} = require('./Golfers')
const {HoleSchema} = require('./Holes')
const {CourseScore, CourseScoreSchema} = require('./CourseScores')
const {HoleScore} = require('./HoleScores')

const GroupSchema = new Schema({
    course: CourseSchema,
    golfers: [GolferSchema], 
    currentCourseScores: [CourseScoreSchema],
    hole: HoleSchema
})

GroupSchema.statics.groupFromCourseAndGolfers = function(course, golfers) {
    // get course
    return Course.findById(course._id)
    .then(course => {
        const courseScores = []
        // get holes on course and make new hole score
        return Promise.all(course.holes.map(hole => new HoleScore({hole, shots: 0})))
        .then(holeScores => {
            // add course score to golfers
            return Promise.all(golfers.map(golfer => {
                // make new course score from holescores
                const newCourseScore = new CourseScore({holeScores})
                courseScores.push(newCourseScore)
                return Golfer.findByIdAndUpdate(
                    golfer._id, 
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
        // return new group created with structure expected in redux
        .then(golfers => new Group({course, golfers, courseScores, hole: course.holes[0]}))
    })
}


const Group = mongoose.model('Group', GroupSchema)

module.exports = {Group, GroupSchema}