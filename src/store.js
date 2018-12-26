import { createStore } from 'redux'

// set up default state
const defaultState = {
    isLoading: false,
    searchTerm: '',
    searchResults: [], // golfer or courses that match searchterm
    edit: {}, // object to edit, course/golfer
    golfState: {
        golfer: {
            _id: 2, 
            name: 'collin', 
            courseScores: [], 
            currentCourseScore: {
                id: 21, 
                holeScores: [
                    {id: 22, hole: {id: 3, number: 1, par: 3}, shots: 4},
                    {id: 23, hole: {id: 4, number: 2, par: 4}, shots: 3},
                    {id: 24, hole: {id: 5, number: 3, par: 5}, shots: 5},
                    {id: 25, hole: {id: 6, number: 4, par: 4}, shots: 3},
                    {id: 26, hole: {id: 7, number: 5, par: 5}, shots: 4},
                    {id: 27, hole: {id: 8, number: 6, par: 3}, shots: 5},
                    {id: 28, hole: {id: 9, number: 7, par: 4}, shots: 3},
                    {id: 29, hole: {id: 10, number: 8, par: 3}, shots: 5},
                    {id: 30, hole: {id: 11, number: 9, par: 5}, shots: 4},
                    {id: 31, hole: {id: 12, number: 10, par: 4}, shots: 4},
                    {id: 32, hole: {id: 13, number: 11, par: 3}, shots: 3},
                    {id: 33, hole: {id: 14, number: 12, par: 5}, shots: 5},
                    {id: 34, hole: {id: 15, number: 13, par: 4}, shots: 6},
                    {id: 35, hole: {id: 16, number: 14, par: 4}, shots: 5},
                    {id: 36, hole: {id: 17, number: 15, par: 3}, shots: 4},
                    {id: 37, hole: {id: 18, number: 16, par: 3}, shots: 3},
                    {id: 38, hole: {id: 19, number: 17, par: 5}, shots: 4},
                    {id: 39, hole: {id: 20, number: 18, par: 5}, shots: 4},
                ]
            },
        }, // logged in golfer
        golfers: [
            {
                _id: 2, 
                name: 'collin', 
                courseScores: [], 
                currentCourseScore: {
                    id: 21, 
                    holeScores: [
                        {id: 22, hole: {id: 3, number: 1, par: 3}, shots: 4},
                        {id: 23, hole: {id: 4, number: 2, par: 4}, shots: 3},
                        {id: 24, hole: {id: 5, number: 3, par: 5}, shots: 5},
                        {id: 25, hole: {id: 6, number: 4, par: 4}, shots: 3},
                        {id: 26, hole: {id: 7, number: 5, par: 5}, shots: 4},
                        {id: 27, hole: {id: 8, number: 6, par: 3}, shots: 5},
                        {id: 28, hole: {id: 9, number: 7, par: 4}, shots: 3},
                        {id: 29, hole: {id: 10, number: 8, par: 3}, shots: 5},
                        {id: 30, hole: {id: 11, number: 9, par: 5}, shots: 4},
                        {id: 31, hole: {id: 12, number: 10, par: 4}, shots: 4},
                        {id: 32, hole: {id: 13, number: 11, par: 3}, shots: 3},
                        {id: 33, hole: {id: 14, number: 12, par: 5}, shots: 5},
                        {id: 34, hole: {id: 15, number: 13, par: 4}, shots: 6},
                        {id: 35, hole: {id: 16, number: 14, par: 4}, shots: 5},
                        {id: 36, hole: {id: 17, number: 15, par: 3}, shots: 4},
                        {id: 37, hole: {id: 18, number: 16, par: 3}, shots: 3},
                        {id: 38, hole: {id: 19, number: 17, par: 5}, shots: 4},
                        {id: 39, hole: {id: 20, number: 18, par: 5}, shots: 4},
                    ]
                },
            },
        ], // all other golfers
        courses: [{id: 1, name: 'Whispering Pines', holes: [
            {id: 3, number: 1, par: 3},
            {id: 4, number: 2, par: 4},
            {id: 5, number: 3, par: 5},
            {id: 6, number: 4, par: 4},
            {id: 7, number: 5, par: 5},
            {id: 8, number: 6, par: 3},
            {id: 9, number: 7, par: 4},
            {id: 10, number: 8, par: 3},
            {id: 11, number: 9, par: 5},
            {id: 12, number: 10, par: 4},
            {id: 13, number: 11, par: 3},
            {id: 14, number: 12, par: 5},
            {id: 15, number: 13, par: 4},
            {id: 16, number: 14, par: 4},
            {id: 17, number: 15, par: 3},
            {id: 18, number: 16, par: 3},
            {id: 19, number: 17, par: 5},
            {id: 20, number: 18, par: 5},
        ]}],  // all the courses
        group: {
    // current golfers
            golfers: [
                {_id: 2, name: 'collin', courseScores: [], 
                    currentCourseScore: {id: 21, holeScores: [
                        {id: 22, hole: {id: 3, number: 1, par: 3}, shots: 4},
                        {id: 23, hole: {id: 4, number: 2, par: 4}, shots: 3},
                        {id: 24, hole: {id: 5, number: 3, par: 5}, shots: 5},
                        {id: 25, hole: {id: 6, number: 4, par: 4}, shots: 3},
                        {id: 26, hole: {id: 7, number: 5, par: 5}, shots: 4},
                        {id: 27, hole: {id: 8, number: 6, par: 3}, shots: 5},
                        {id: 28, hole: {id: 9, number: 7, par: 4}, shots: 3},
                        {id: 29, hole: {id: 10, number: 8, par: 3}, shots: 5},
                        {id: 30, hole: {id: 11, number: 9, par: 5}, shots: 4},
                        {id: 31, hole: {id: 12, number: 10, par: 4}, shots: 4},
                        {id: 32, hole: {id: 13, number: 11, par: 3}, shots: 3},
                        {id: 33, hole: {id: 14, number: 12, par: 5}, shots: 5},
                        {id: 34, hole: {id: 15, number: 13, par: 4}, shots: 6},
                        {id: 35, hole: {id: 16, number: 14, par: 4}, shots: 5},
                        {id: 36, hole: {id: 17, number: 15, par: 3}, shots: 4},
                        {id: 37, hole: {id: 18, number: 16, par: 3}, shots: 3},
                        {id: 38, hole: {id: 19, number: 17, par: 5}, shots: 4},
                        {id: 39, hole: {id: 20, number: 18, par: 5}, shots: 4},
                    ]},
                },
                {id: 40, name: 'coolin', courseScores: [], 
                    currentCourseScore: {id: 41, holeScores: [
                        {id: 42, hole: {id: 3, number: 1, par: 3}, shots: 4},
                        {id: 43, hole: {id: 4, number: 2, par: 4}, shots: 3},
                        {id: 44, hole: {id: 5, number: 3, par: 5}, shots: 5},
                        {id: 45, hole: {id: 6, number: 4, par: 4}, shots: 3},
                        {id: 46, hole: {id: 7, number: 5, par: 5}, shots: 4},
                        {id: 47, hole: {id: 8, number: 6, par: 3}, shots: 5},
                        {id: 48, hole: {id: 9, number: 7, par: 4}, shots: 3},
                        {id: 49, hole: {id: 10, number: 8, par: 3}, shots: 5},
                        {id: 50, hole: {id: 11, number: 9, par: 5}, shots: 4},
                        {id: 51, hole: {id: 12, number: 10, par: 4}, shots: 4},
                        {id: 52, hole: {id: 13, number: 11, par: 3}, shots: 3},
                        {id: 53, hole: {id: 14, number: 12, par: 5}, shots: 5},
                        {id: 54, hole: {id: 15, number: 13, par: 4}, shots: 6},
                        {id: 55, hole: {id: 16, number: 14, par: 4}, shots: 5},
                        {id: 56, hole: {id: 17, number: 15, par: 3}, shots: 4},
                        {id: 57, hole: {id: 18, number: 16, par: 3}, shots: 3},
                        {id: 58, hole: {id: 19, number: 17, par: 5}, shots: 4},
                        {id: 59, hole: {id: 20, number: 18, par: 5}, shots: 4},
                    ]},
                },
            ],
            course: {id: 1, name: 'Whispering Pines', holes: [ // current course
                {id: 3, number: 1, par: 3},
                {id: 4, number: 2, par: 4},
                {id: 5, number: 3, par: 5},
                {id: 6, number: 4, par: 4},
                {id: 7, number: 5, par: 5},
                {id: 8, number: 6, par: 3},
                {id: 9, number: 7, par: 4},
                {id: 10, number: 8, par: 3},
                {id: 11, number: 9, par: 5},
                {id: 12, number: 10, par: 4},
                {id: 13, number: 11, par: 3},
                {id: 14, number: 12, par: 5},
                {id: 15, number: 13, par: 4},
                {id: 16, number: 14, par: 4},
                {id: 17, number: 15, par: 3},
                {id: 18, number: 16, par: 3},
                {id: 19, number: 17, par: 5},
                {id: 20, number: 18, par: 5},
            ]},
            hole: {id: 12, number: 10, par: 4}, // current hole
        },
    },
}

// action types
// Create
// async
const ADD_GOLFER = {
    type: 'ADD_GOLFER'
}
// async
const ADD_COURSE = {
    type: 'ADD_COURSE'
}
// async
const ADD_GROUP = {
    type: 'ADD_GROUP'
}
// Retrieve
// after log in
const REQUEST_GOLF_STATE = {
    type: 'REQUEST_GOLF_STATE'
}
// Update
// logged in
const RECEIVE_GOLF_STATE = {
    type: 'RECEIVE_GOLF_STATE'
}
const LOGIN_GOLFER = {
    type: 'LOGIN_GOLFER'
}
const LOGOUT_GOLFER = {
    type: 'LOGOUT_GOLFER'
}
// editing course
const UPDATE_COURSE = {
    type: 'UPDATE_COURSE'
}
// editing golfer
const UPDATE_GOLFER = {
    type: 'UPDATE_GOLFER'
}
// playing round
const UPDATE_CURRENT_HOLE = {
    type: 'UPDATE_CURRENT_HOLE'
}
const UPDATE_HOLE_SCORE = {
    type: 'UPDATE_HOLE_SCORE'
}
// Delete
const DELETE_COURSE = {
    type: 'DELETE_COURSE'
}
const DELETE_GOLFER = {
    type: 'DELETE_GOLFER'
}
const DELETE_COURSE_SCORE = {
    type: 'DELETE_COURSE_SCORE'
}
const DELETE_GROUP = {
    type: 'DELETE_GROUP'
}

// action methods
// Create
export const addCourse = (course) => {
    fetch('/course', {
        method: 'post',
        body: JSON.stringify(course),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(golfState => store.dispatch(receiveGolfState(golfState)))
    return {
        ...ADD_COURSE,
        isLoading: true
    }
}
export const addGolfer = (golfer) => {
    fetch('/register', {
        method: 'post',
        body: JSON.stringify(golfer),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(golfState => store.dispatch(receiveGolfState(golfState)))
    return {
        ...ADD_GOLFER,
        isLoading: true
    }
}
export const addGroup = (group) => {
    fetch('/teetime', {
        method: 'post',
        body: JSON.stringify(group),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(golfState => store.dispatch(receiveGolfState(golfState)))
    return {
        ...ADD_GROUP,
        isLoading: true
    }
}
// Retrieve
export const requestGolfState = () => {
    fetch('/')
    .then(res => res.json())
    .then(golfState => store.dispatch(receiveGolfState(golfState)))
    return {
        ...REQUEST_GOLF_STATE,
        isLoading: true
    }
}
const receiveGolfState = (golfState) => {
    console.log('receiving golf state')
    return {
        ...RECEIVE_GOLF_STATE,
        golfState,
        isLoading: false
    }
}
// Update
export const loginGolfer = (loginInfo) => {
    fetch('/login', {
        method: 'post',
        body: JSON.stringify(loginInfo),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(golfState => store.dispatch(receiveGolfState(golfState)))
    return {
        ...LOGIN_GOLFER,
        isLoading: true
    }
}
export const logoutGolfer = () => {
    fetch('/logout')
    .then(res => res.json())
    .then(golfState => store.dispatch(receiveGolfState(golfState)))
    return {
        ...LOGOUT_GOLFER,
        isLoading: true
    }
}
export const updateCourse = (course) => {
    fetch('/updateCourse', {
        method: 'post',
        body: JSON.stringify(course),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json)
    .then(golfState => store.dispatch(receiveGolfState(golfState)))
    return {
        ...UPDATE_COURSE,
        isLoading: true
    }
}
export const updateGolfer = (golfer) => {
    fetch('/updateGolfer', {
        method: 'post',
        body: JSON.stringify(golfer),
        headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json)
    .then(golfState => store.dispatch(receiveGolfState(golfState)))
    return {
        ...UPDATE_GOLFER,
        isLoading: true
    }
}
export const updateCurrentHole = (hole) => {
    return {
        ...UPDATE_CURRENT_HOLE,
        hole
    }
}
export const updateHoleScore = (holeScore) => {
    fetch('/stroke', {
        method: 'post',
        body: JSON.stringify(holeScore),
        headers: {'ContentType': 'application/json'}
    })
    .then(res => res.json())
    .then(golfState => store.dispatch(receiveGolfState(golfState)))
    return {
        ...UPDATE_HOLE_SCORE,
        isLoading: true
    }
}
// Delete
export const deleteCourse = (course) => {
    return {
        ...DELETE_COURSE,
        course
    }
}
export const deleteGolfer = (golfer) => {
    return {
        ...DELETE_GOLFER,
        golfer
    }
}
export const deleteGroup = (group) => {
    return {
        ...DELETE_GROUP,
        group
    }
}
export const deleteCourseScore = (courseScore) => {
    return {
        ...DELETE_COURSE_SCORE,
        courseScore
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
            isLoading: action.isLoading
        }
        case ADD_GOLFER.type:
        return {
            ...state,
            golfers: [
                ...state.golfers,
                action.newGolfer
            ]
        }
        case ADD_GROUP.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        // Retrieve
        case REQUEST_GOLF_STATE.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        // Update
        case RECEIVE_GOLF_STATE.type:
        return {
            ...state,
            golfState: action.golfState,
            isLoading: action.isLoading
        }
        case LOGIN_GOLFER.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case LOGOUT_GOLFER.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case UPDATE_COURSE.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case UPDATE_GOLFER.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case UPDATE_HOLE_SCORE.type:
        return {
            ...state,
            isLoading: action.isLoading
        }
        case UPDATE_CURRENT_HOLE.type:
        return {
            ...state,
            group: {
                ...state.group,
                hole: action.hole
            }
        }
        // Delete
        case DELETE_COURSE.type:
        return {
            ...state,
            courses: state.courses.filter(course => course.id !== action.courseToDelete.id)
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
        default:
        return state
    }
}

const store = createStore(
    scorecard,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store