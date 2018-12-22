import { createStore } from 'redux'
import uuid from 'uuid/v4'

// set up default state
const defaultState = {
    courses: [{id: 1, name: 'Golf Course'}], // all the courses
    holes: [
        {id: 3, course_id: 1, number: 1, par: 3},
        {id: 4, course_id: 1, number: 2, par: 4},
        {id: 5, course_id: 1, number: 3, par: 5},
        {id: 6, course_id: 1, number: 4, par: 4},
        {id: 7, course_id: 1, number: 5, par: 5},
        {id: 8, course_id: 1, number: 6, par: 3},
        {id: 9, course_id: 1, number: 7, par: 4},
        {id: 10, course_id: 1, number: 8, par: 3},
        {id: 11, course_id: 1, number: 9, par: 5},
        {id: 12, course_id: 1, number: 10, par: 4},
        {id: 13, course_id: 1, number: 11, par: 3},
        {id: 14, course_id: 1, number: 12, par: 5},
        {id: 15, course_id: 1, number: 13, par: 4},
        {id: 16, course_id: 1, number: 14, par: 4},
        {id: 17, course_id: 1, number: 15, par: 3},
        {id: 18, course_id: 1, number: 16, par: 3},
        {id: 19, course_id: 1, number: 17, par: 5},
        {id: 20, course_id: 1, number: 18, par: 5},
    ], // all the holes
    golfers: [{id: 2, name: 'Golfer 1'}], // all the golfers
    courseScores: [{id: 21, course_id: 1, golfer_id: 2}], // all the scores
    holeScores: [
        {id: 22, course_score_id: 21, hole_id: 3, shots: 4},
        {id: 23, course_score_id: 21, hole_id: 4, shots: 3},
        {id: 24, course_score_id: 21, hole_id: 5, shots: 5},
        {id: 25, course_score_id: 21, hole_id: 6, shots: 3},
        {id: 26, course_score_id: 21, hole_id: 7, shots: 4},
        {id: 27, course_score_id: 21, hole_id: 8, shots: 5},
        {id: 28, course_score_id: 21, hole_id: 9, shots: 3},
        {id: 29, course_score_id: 21, hole_id: 10, shots: 5},
        {id: 30, course_score_id: 21, hole_id: 11, shots: 4},
        {id: 31, course_score_id: 21, hole_id: 12, shots: 4},
        {id: 32, course_score_id: 21, hole_id: 13, shots: 3},
        {id: 33, course_score_id: 21, hole_id: 14, shots: 5},
        {id: 34, course_score_id: 21, hole_id: 15, shots: 6},
        {id: 35, course_score_id: 21, hole_id: 16, shots: 5},
        {id: 36, course_score_id: 21, hole_id: 17, shots: 4},
        {id: 37, course_score_id: 21, hole_id: 18, shots: 3},
        {id: 38, course_score_id: 21, hole_id: 19, shots: 4},
        {id: 39, course_score_id: 21, hole_id: 20, shots: 4},
    ], // all the hole scores
    currentGolfer: {id: 2, name: 'Golfer 1'},
    currentCourse: {id: 1, name: 'Golf Course'}, // the current course
    currentHole: {id: 12, course_id: 1, number: 10, par: 4},
    currentGroup: [{id: 2, name: 'Golfer 1'}], // the current golfers
    currentCourseScores: [{id: 21, course_id: 1, golfer_id: 2}], // the current scores
    currentHoleScores: [
        {id: 22, course_score_id: 21, hole_id: 3, shots: 4},
        {id: 23, course_score_id: 21, hole_id: 4, shots: 3},
        {id: 24, course_score_id: 21, hole_id: 5, shots: 5},
        {id: 25, course_score_id: 21, hole_id: 6, shots: 3},
        {id: 26, course_score_id: 21, hole_id: 7, shots: 4},
        {id: 27, course_score_id: 21, hole_id: 8, shots: 5},
        {id: 28, course_score_id: 21, hole_id: 9, shots: 3},
        {id: 29, course_score_id: 21, hole_id: 10, shots: 5},
        {id: 30, course_score_id: 21, hole_id: 11, shots: 4},
        {id: 31, course_score_id: 21, hole_id: 12, shots: 4},
        {id: 32, course_score_id: 21, hole_id: 13, shots: 3},
        {id: 33, course_score_id: 21, hole_id: 14, shots: 5},
        {id: 34, course_score_id: 21, hole_id: 15, shots: 6},
        {id: 35, course_score_id: 21, hole_id: 16, shots: 5},
        {id: 36, course_score_id: 21, hole_id: 17, shots: 4},
        {id: 37, course_score_id: 21, hole_id: 18, shots: 3},
        {id: 38, course_score_id: 21, hole_id: 19, shots: 4},
        {id: 39, course_score_id: 21, hole_id: 20, shots: 4},
    ], 
    isLoading: false,

    // searchTerm: ''
}

// action types
// Create
const ADD_COURSE = {
    type: 'ADD_COURSE'
}
const ADD_HOLE = {
    type: 'ADD_HOLE'
}
const ADD_GOLFER = {
    type: 'ADD_GOLFER'
}
const ADD_COURSE_SCORE = {
    type: 'ADD_COURSE_SCORE'
}
const ADD_HOLE_SCORE = {
    type: 'ADD_HOLE_SCORE'
}
const ADD_CURRENT_COURSE = {
    type: 'ADD_CURRENT_COURSE'
}
const ADD_CURRENT_HOLE = {
    type: 'ADD_CURRENT_HOLE'
}
const ADD_CURRENT_GOLFER = {
    type: 'ADD_CURRENT_GOLFER'
}
const ADD_CURRENT_COURSE_SCORE = {
    type: 'ADD_CURRENT_COURSE_SCORE'
}
const ADD_CURRENT_HOLE_SCORE = {
    type: 'ADD_CURRENT_HOLE_SCORE'
}
// Retrieve
const REQUEST_GOLF_STATE = {
    type: 'REQUEST_GOLF_STATE'
}
// Update
const RECEIVE_GOLF_STATE = {
    type: 'RECEIVE_GOLF_STATE'
}
const UPDATE_COURSE = {
    type: 'UPDATE_COURSE'
}
const UPDATE_HOLE = {
    type: 'UPDATE_HOLE'
}
const UPDATE_GOLFER = {
    type: 'UPDATE_GOLFER'
}
const UPDATE_COURSE_SCORE = {
    type: 'UPDATE_COURSE_SCORE'
}
const UPDATE_HOLE_SCORE = {
    type: 'UPDATE_HOLE_SCORE'
}
const UPDATE_CURRENT_COURSE = {
    type: 'UPDATE_CURRENT_COURSE'
}
const UPDATE_CURRENT_HOLE = {
    type: 'UPDATE_CURRENT_HOLE'
}
const UPDATE_CURRENT_GOLFER = {
    type: 'UPDATE_CURRENT_GOLFER'
}
const UPDATE_CURRENT_COURSE_SCORE = {
    type: 'UPDATE_CURRENT_COURSE_SCORE'
}
const UPDATE_CURRENT_HOLE_SCORE = {
    type: 'UPDATE_CURRENT_HOLE_SCORE'
}
// Delete
const DELETE_COURSE = {
    type: 'DELETE_COURSE'
}
const DELETE_HOLE = {
    type: 'DELETE_HOLE'
}
const DELETE_GOLFER = {
    type: 'DELETE_GOLFER'
}
const DELETE_COURSE_SCORE = {
    type: 'DELETE_COURSE_SCORE'
}
const DELETE_HOLE_SCORE = {
    type: 'DELETE_HOLE_SCORE'
}
const DELETE_CURRENT_COURSE = {
    type: 'DELETE_CURRENT_COURSE'
}
const DELETE_CURRENT_HOLE = {
    type: 'DELETE_CURRENT_HOLE'
}
const DELETE_CURRENT_GOLFER = {
    type: 'DELETE_CURRENT_GOLFER'
}
const DELETE_CURRENT_COURSE_SCORE = {
    type: 'DELETE_CURRENT_COURSE_SCORE'
}
const DELETE_CURRENT_HOLE_SCORE = {
    type: 'DELETE_CURRENT_HOLE_SCORE'
}

// action methods
// Create
export const addCourse = ({name}) => {
    return {
        ...ADD_COURSE,
        newCourse: {
            id: uuid(),
            name
        }
    }
}
export const addHole = ({course_id, number, par}) => {
    return {
        ...ADD_HOLE,
        newHole: {
            id: uuid(),
            course_id,
            number,
            par
        }
    }
}
export const addGolfer = ({name}) => {
    return {
        ...ADD_GOLFER,
        newGolfer: {
            id: uuid(),
            name
        }
    }
}
export const addCourseScore = ({golfer_id, course_id}) => {
    return {
        ...ADD_COURSE_SCORE,
        newCourseScore: {
            id: uuid(),
            golfer_id,
            course_id
        }
    }
}
export const addHoleScore = ({course_score_id, hole_id, shots}) => {
    return {
        ...ADD_HOLE_SCORE,
        newHoleScore: {
            id: uuid(),
            course_score_id, 
            hole_id,
            shots
        }
    }
}
export const addCurrentCourse = ({id, name}) => {
    return {
        ...ADD_CURRENT_COURSE,
        newCurrentCourse: {
            id,
            name
        }
    }
}
export const addCurrentHole = ({id, course_id, number, par}) => {
    return {
        ...ADD_CURRENT_HOLE,
        newCurrentHole: {
            id,
            course_id,
            number,
            par
        }
    }
}
export const addCurrentGolfer = ({id, name}) => {
    return {
        ...ADD_CURRENT_GOLFER,
        newCurrentGolfer: {
            id,
            name
        }
    }
}
export const addCurrentCourseScore = ({id, golfer_id, course_id}) => {
    return {
        ...ADD_CURRENT_COURSE_SCORE,
        newCurrentCourseScore: {
            id,
            golfer_id,
            course_id
        }
    }
}
export const addCurrentHoleScore = ({id, course_score_id, hole_id, shots}) => {
    return {
        ...ADD_CURRENT_HOLE_SCORE,
        newCurrentHoleScore: {
            id,
            course_score_id, 
            hole_id,
            shots
        }
    }
}
// Retrieve
export const requestGolfState = () => {
    fetch('http://localhost:3002/')
    .then(res => res.json())
    .then(receiveGolfState)
    return {
        ...REQUEST_GOLF_STATE,
        isLoading: true
    }
}
const receiveGolfState = (golfState) => {
    return {
        ...RECEIVE_GOLF_STATE,
        golfState,
        isLoading: false
    }
}
// Update
export const updateCourse = ({id, name}) => {
    return {
        ...UPDATE_COURSE,
        updatedCourse: {
            id,
            name
        }
    }
}
export const updateHole = ({id, course_id, number, par}) => {
    return {
        ...UPDATE_HOLE,
        updatedHole: {
            id,
            course_id,
            number,
            par
        }
    }
}
export const updateGolfer = ({id, name}) => {
    return {
        ...UPDATE_GOLFER,
        updatedGolfer: {
            id,
            name
        }
    }
}
export const updateCourseScore = ({id, course_id, golfer_id}) => {
    return {
        ...UPDATE_COURSE_SCORE,
        updatedCourseScore: {
            id,
            course_id,
            golfer_id
        }
    }
}
export const updateHoleScore = ({id, course_score_id, hole_id, shots}) => {
    return {
        ...UPDATE_HOLE_SCORE,
        updatedHoleScore: {
            id,
            course_score_id,
            hole_id,
            shots
        }
    }
}
export const updateCurrentCourse = ({id, name}) => {
    return {
        ...UPDATE_CURRENT_COURSE,
        updatedCurrentCourse: {
            id,
            name
        }
    }
}
export const updateCurrentHole = ({id, course_id, number, par}) => {
    return {
        ...UPDATE_CURRENT_HOLE,
        updatedCurrentHole: {
            id,
            course_id,
            number,
            par
        }
    }
}
export const updateCurrentGolfer = ({id, name}) => {
    return {
        ...UPDATE_CURRENT_GOLFER,
        updatedCurrentGolfer: {
            id,
            name
        }
    }
}
export const updateCurrentCourseScore = ({id, golfer_id, course_id}) => {
    return {
        ...UPDATE_CURRENT_COURSE_SCORE,
        updatedCurrentCourseScore: {
            id,
            golfer_id,
            course_id
        }
    }
}
export const updateCurrentHoleScore = ({id, course_score_id, hole_id, shots}) => {
    return {
        ...UPDATE_CURRENT_HOLE_SCORE,
        updatedCurrentHoleScore: {
            id,
            course_score_id, 
            hole_id,
            shots
        }
    }
}
// Delete
export const deleteCourse = ({id, name}) => {
    return {
        ...DELETE_COURSE,
        courseToDelete: {
            id,
            name
        }
    }
}
export const deleteHole = ({id, course_id, number, par}) => {
    return {
        ...DELETE_HOLE,
        holeToDelete: {
            id,
            course_id,
            number,
            par
        }
    }
}
export const deleteGolfer = ({id, name}) => {
    return {
        ...DELETE_GOLFER,
        golferToDelete: {
            id,
            name
        }
    }
}
export const deleteCourseScore = ({id, course_id, golfer_id}) => {
    return {
        ...DELETE_COURSE_SCORE,
        courseScoreToDelete: {
            id,
            course_id,
            golfer_id
        }
    }
}
export const deleteHoleScore = ({id, course_score_id, hole_id, shots}) => {
    return {
        ...DELETE_HOLE_SCORE,
        holeScoreToDelete: {
            id,
            course_score_id,
            hole_id,
            shots
        }
    }
}
export const deleteCurrentCourse = ({id, name}) => {
    return {
        ...DELETE_CURRENT_COURSE,
        deletedCurrentCourse: {
            id,
            name
        }
    }
}
export const deleteCurrentHole = ({id, course_id, number, par}) => {
    return {
        ...DELETE_CURRENT_HOLE,
        deletedCurrentHole: {
            id,
            course_id,
            number,
            par
        }
    }
}
export const deleteCurrentGolfer = ({id, name}) => {
    return {
        ...DELETE_CURRENT_GOLFER,
        deletedCurrentGolfer: {
            id,
            name
        }
    }
}
export const deleteCurrentCourseScore = ({id, golfer_id, course_id}) => {
    return {
        ...DELETE_CURRENT_COURSE_SCORE,
        deletedCurrentCourseScore: {
            id,
            golfer_id,
            course_id
        }
    }
}
export const deleteCurrentHoleScore = ({id, course_score_id, hole_id, shots}) => {
    return {
        ...DELETE_CURRENT_HOLE_SCORE,
        deletedCurrentHoleScore: {
            id,
            course_score_id, 
            hole_id,
            shots
        }
    }
}


// reducer
const scorecard = (state=defaultState, action) => {
    if (!action) {
        return state
    }
    switch (action.type){
        // Create
        case ADD_COURSE.type:
        return {
            ...state,
            courses: [
                ...state.courses,
                action.newCourse
            ]
        }
        case ADD_HOLE.type:
        return {
            ...state,
            holes: [
                ...state.holes,
                action.newHole
            ]
        }
        case ADD_GOLFER.type:
        return {
            ...state,
            golfers: [
                ...state.golfers,
                action.newGolfer
            ]
        }
        case ADD_COURSE_SCORE.type:
        return {
            ...state,
            courseScores: [
                ...state.courseScores,
                action.newCourseScore
            ]
        }
        case ADD_HOLE_SCORE.type:
        return {
            ...state,
            holeScores: [
                ...state.holeScores,
                action.newHoleScore
            ]
        }
        case ADD_CURRENT_COURSE.type:
        return {
            ...state,
            currentCourse: action.newCurrentCourse
        }
        case ADD_CURRENT_HOLE.type:
        return {
            ...state,
            currentHole: action.newCurrentHole
        }
        case ADD_CURRENT_GOLFER.type:
        return {
            ...state,
            currentGolfers: [
                ...state.currentGolfers,
                action.newCurrentGolfer
            ]
        }
        case ADD_CURRENT_COURSE_SCORE.type:
        return {
            ...state,
            currentCourseScores: [
                ...state.currentCourseScores,
                action.newCurrentCourseScore
            ]
        }
        case ADD_CURRENT_HOLE_SCORE.type:
        return {
            ...state,
            currentHoleScores: [
                ...state.currentHoleScores,
                action.newCurrentHoleScore
            ]
        }
        // Retrieve
        case REQUEST_GOLF_STATE.type:
        return {
            ...state,
            golfState: action.golfState
        }
        // Update
        case RECEIVE_GOLF_STATE.type:
        return {
            ...state,
            golfState: action.golfState
        }
        case UPDATE_COURSE.type:
        return {
            ...state,
            courses: state.courses.map(course => {
                if (course.id === action.updatedCourse.id) {
                    return action.updatedCourse
                } else {
                    return course
                }
            })
        }
        case UPDATE_HOLE.type:
        return {
            ...state,
            holes: state.holes.map(hole => {
                if (hole.id === action.updatedHole.id) {
                    return action.updatedHole
                } else {
                    return hole
                }
            })
        }
        case UPDATE_GOLFER.type:
        return {
            ...state,
            golfers: state.golfers.map(golfer => {
                if (golfer.id === action.updatedGolfer.id) {
                    return action.updatedGolfer
                } else {
                    return golfer
                }
            })
        }
        case UPDATE_COURSE_SCORE.type:
        return {
            ...state,
            courseScores: state.courseScores.map(courseScore => {
                if (courseScore.id === action.updatedCourseScore.id) {
                    return action.updatedCourseScore
                } else {
                    return courseScore
                }
            })
        }
        case UPDATE_HOLE_SCORE.type:
        return {
            ...state,
            holeScores: state.holeScores.map(holeScore => {
                if (holeScore.id === action.updatedHoleScore.id) {
                    return action.updatedHoleScore
                } else {
                    return holeScore
                }
            })
        }
        case UPDATE_CURRENT_COURSE.type:
        return {
            ...state,
            currentCourse: action.updatedCurrentCourse
        }
        case UPDATE_CURRENT_HOLE.type:
        return {
            ...state,
            currentHole: action.updatedCurrentHole
        }
        case UPDATE_CURRENT_GOLFER.type:
        return {
            ...state,
            currentGolfers: state.currentGolfers.map(golfer => {
                if (golfer.id === action.updatedCurrentGolfer.id) {
                    return action.updatedCurrentGolfer
                } else {
                    return golfer
                }
            })
        }
        case UPDATE_CURRENT_COURSE_SCORE.type:
        return {
            ...state,
            currentCourseScores: state.currentCourseScores.map(score => {
                if (score.id === action.updatedCurrentCourseScore.id) {
                    return action.updatedCurrentCourseScore
                } else {
                    return score
                }
            })
        }
        case UPDATE_CURRENT_HOLE_SCORE.type:
        return {
            ...state,
            currentHoleScores: state.currentHoleScores.map(score => {
                if (score.id === action.updatedCurrentHoleScore.id) {
                    return action.updatedCurrentHoleScore
                } else {
                    return score
                }
            }).sort((score1, score2) => score2.number - score1.number)
        }
        // Delete
        case DELETE_COURSE.type:
        return {
            ...state,
            courses: state.courses.filter(course => course.id !== action.courseToDelete.id)
        }
        case DELETE_HOLE.type:
        return {
            ...state,
            holes: state.holes.filter(hole => hole.id !== action.holeToDelete.id)
        }
        case DELETE_GOLFER.type:
        return {
            ...state,
            golfers: state.golfers.filter(golfer => golfer.id !== action.golferToDelete.id)
        }
        case DELETE_COURSE_SCORE.type:
        return {
            ...state,
            courseScores: state.courseScores.filter(courseScore => courseScore.id !== action.courseScoreToDelete.id)
        }
        case DELETE_HOLE_SCORE.type:
        return {
            ...state,
            holeScores: state.holeScores.filter(holeScore => holeScore.id !== action.holeScoreToDelete.id)
        }
        case DELETE_CURRENT_COURSE.type:
        return {
            ...state,
            currentCourse: {}
        }
        case DELETE_CURRENT_HOLE.type:
        return {
            ...state,
            currentHole: {}
        }
        case DELETE_CURRENT_GOLFER.type:
        return {
            ...state,
            currentGolfers: state.currentGolfers.filter(golfer => golfer.id !== action.deleteCurrentGolfer.id)
        }
        case DELETE_CURRENT_COURSE_SCORE.type:
        return {
            ...state,
            currentCourseScores: state.currentCourseScores.filter(score => score.id !== action.deletedCurrentCourseScore.id)
        }
        case DELETE_CURRENT_HOLE_SCORE.type:
        return {
            ...state,
            currentHoleScores: state.currentHoleScores.filter(score => score.id !== action.deletedCurrentHoleScore.id)
        }
        default:
        return state
    }
}

const store = createStore(
    scorecard,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store