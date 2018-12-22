const {Golfer} = require('./models/Golfers')
const {Course} = require('./models/Courses')
const {CourseScore} = require('./models/CourseScores')
const {Hole} = require('./models/Holes')
const {HoleScore} = require('./models/HoleScores')
const {Group} = require('./models/Groups')

const express = require('express')
const mongoose = require('mongoose') 
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const bodyParser = require('body-parser')
const assert = require('assert')

const app = express()
const port = 3002
mongoose.connect(`mongodb://localhost:27017/scorecard-db`, { useNewUrlParser: true });
const store = new MongoDBStore({
  uri: `mongodb://localhost:27017/scorecard-db`,
  collection: 'sessions'
})

// catch errors
store.on('error', error => {
  assert.ifError(error)
  assert.ok(false)
})

app.use(session({
    secret: 'random123',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store,
    resave: true,
    saveUninitialized: true
}));
 
// app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

// middleware
function checkGolfer(req, res, next) {
  console.log('checking golfer')
  if (req.session.golfer) {
    console.log('golfer checked out')
    next()
  } else {
    console.log('golfer redirected')
    res.redirect('logout')
  }
}

function checkRound(req, res, next) {
  console.log('checking round')
  if (req.session.round) {
    console.log('round checked out')
    next()
  } else {
    console.log('round redirected')
    res.redirect('clubhouse')
  }
}

function getGolfState(golfer) {
  // get all the updated courses
  return Course.find()
  .then(courses => {
    console.log('getting golf state')
    // update the current golfer
    return golfer ? Golfer.findById(golfer.id)
      .then(golfer => {
        console.log('getting state for logged in golfer')
        // update the group
        return Promise.all(req.session.group.map(groupMember => Golfer.findById(groupMember.id)))
        .then(group => {
          return {
            golfer, // signed in golfer
            courses, // all the courses
            group // current group
          }
        })
      }) : {
        golfer: {},
        courses,
        group: {}
      }
  })
}

// route handlers
// user attempted login
app.post('/login', (req, res) => {
  console.log('attempting login')
  const name = req.body.name
  Golfer.findOne({name})
  .then(golfer => {
    req.session.golfer = golfer
    res.redirect('/clubhouse')
  })
})

// user attempted register
app.post('/register', (req, res) => {
  console.log('attempting register') 
  const name = req.body.name
  const newGolfer = new Golfer({name})
  newGolfer.save(function (err) {
    if (err) return handleError(err)
  })
  req.session.golfer = newGolfer
  res.redirect('/clubhouse')
})

// user logged out
app.get('/logout', (req, res) => {
  console.log('logging out')
  req.session.destroy(err => {
    getGolfState()
    .then(JSON.stringify)
    .then(data => res.send(data))
  })
})

// user logged in
app.get('/clubhouse', checkGolfer, (req, res) => {
  console.log('returning golfer info')
  console.log(req.session.golfer)
  getGolfState(req.session.golfer)
  .then(JSON.stringify)
  .then(data => res.send(data))
})

// user added course
app.post('/course', checkGolfer, (req, res) => {
  console.log('adding new course')
  const {name, holes} = req.body
  const newCourse = new Course({name, holes})
  newCourse.save(function (err) {
    if (err) return handleError(err)
  })
  getGolfState(req.session.golfer)
  .then(JSON.stringify)
  .then(data => res.send(data))
})

// making new round
app.post('/teetime', checkGolfer, (req, res) => {
  console.log('making tee time')
  const course = req.body.course
  const golfers = req.body.golfers
  Group.groupFromCourseAndGolfers(course, golfers)
  .then(group => {
    console.log(group)
    group.save(function (err) {
      if (err) return handleError(err)
    })
    req.session.group = group
    res.redirect('')
  })
})

app.get('/', checkGolfer, checkRound, (req, res) => {
  console.log('playing round')
  getGolfState(req.session.golfer)
  .then(JSON.stringify)
  .then(data => res.send(data))
})

app.post('/stroke', checkGolfer, (req, res) => {
  console.log('taking stroke')
  const {id, shots} = req.body
  HoleScore.findByIdAndUpdate(id, {shots})
  .then(() => {
    getGolfState(req.session.golfer)
    .then(JSON.stringify)
    .then(res.send)
  })
})

app.post('/updateCourse', checkGolfer, (req, res) => {
  console.log('updating course')
  const course = req.body.course
  Course.findByIdAndUpdate(course.id, course)
  .then(() => {
    getGolfState(req.session.golfer)
    .then(JSON.stringify)
    .then(res.send)
  })
})

app.post('/updateGolfer', checkGolfer, (req, res) => {
  console.log('updating golfer')
  const golfer = req.body.golfer
  Golfer.findByIdAndUpdate(golfer.id, golfer)
  .then(() => {
    getGolfState(req.session.golfer)
    .then(JSON.stringify)
    .then(res.send)
  })
})

app.listen(port, () => console.log(`My Task App listening on port ${port}!`))