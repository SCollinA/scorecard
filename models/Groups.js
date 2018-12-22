const mongoose = require('mongoose')
const Schema = mongoose.Schema

const {CourseSchema} = require('./Courses')
const {GolferSchema} = require('./Golfers')
const {HoleSchema} = require('./Holes')

const GroupSchema = new Schema({
    // holds the current course scores for current group
    course: CourseSchema,
    golfers: [GolferSchema], 
    hole: HoleSchema
})

GroupSchema.statics.groupFromCourseAndGolfers = function(course, golfers) {
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
        // return new group created with structure expected in redux
        .then(golfers => new Group({course, golfers, hole: course.holes[0]}))
    })
}


const Group = mongoose.model('Group', GroupSchema)

module.exports = {Group, GroupSchema}