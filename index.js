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
    res.redirect('/login')
  }
}

function checkRound(req, res, next) {
  console.log('checking round')
  if (req.session.round) {
    console.log('round checked out')
    next()
  } else {
    console.log('round redirected')
    res.redirect('/clubhouse')
  }
}

function getDBState() {
  Course.find()
  .then(courses => {
    Hole.find()
    .then(holes => {
      Golfer.find()
      .then(golfers => {
        CourseScore.find()
        .then(courseScores => {
          HoleScore.find()
          .then(holeScores => {
            return {
              courses, // all the courses
              holes, // all the holes
              golfers, // all the golfers
              courseScores, // all the scores
              holeScores, // all the hole scores
            }
          })
        })
      })  
    })
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
    console.log(err)
    res.redirect('/login')
  })
})

// user logged in
app.get('/clubhouse', checkGolfer, (req, res) => {
  console.log('returning golfer info')
  console.log(req.session.golfer)
  res.send(JSON.stringify(req.session.golfer))
})

// making new round
app.post('/teetime', checkGolfer, (req, res) => {
  console.log('making tee time')
  const course = req.body.course
  const golfers = req.body.golfers
  Group.newGroupFromCourseAndGolfers(course, golfers)
  .then(newGroup => {
    console.log(newGroup)
    newGroup.save(function (err) {
      if (err) return handleError(err)
    })
    req.session.round = newGroup
    res.send(JSON.stringify(req.session.round))
  })
})

app.get('/', checkGolfer, checkRound, (req, res) => {
  console.log('playing round')
  req.session.golfer = new Golfer()
  res.send('Hello' + JSON.stringify(req.session))
})

app.listen(port, () => console.log(`My Task App listening on port ${port}!`))