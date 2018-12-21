const Golfer = require('./models/Golfers')
const Course = require('./models/Courses')
const CourseScore = require('./models/CourseScores')
const Holes = require('./models/Holes')
const HoleScores = require('./models/HoleScores')
const Groups = require('./models/Groups')

const express = require('express')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const bodyParser = require('body-parser')
const assert = require('assert')

const app = express()
const port = 3002
const store = new MongoDBStore({
  uri: `mongodb://localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  collection: 'sessions'
})

// catch erros
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

function checkUser(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/login')
  }
}

function checkRound(req, res, next) {
  if (req.session.round) {
    next()
  } else {
    res.redirect('/login')
  }
}

// var Tank = mongoose.model('Tank', yourSchema);

// var small = new Tank({ size: 'small' });
// small.save(function (err) {
//   if (err) return handleError(err);
//   // saved!
// });

// // or

// Tank.create({ size: 'small' }, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });

// // or, for inserting large batches of documents
// Tank.insertMany([{ size: 'small' }], function(err) {

// });



app.get('/login', (req, res) => {
  console.log('backend probed')
  req.session.golfer = new Golfer()
  res.send('Hello' + JSON.stringify(req.session))
})

app.get('/clubhouse', checkUser, (req, res) => {
  console.log('backend probed')
  req.session.golfer = new Golfer()
  res.send('Hello' + JSON.stringify(req.session))
})

app.get('/', checkUser, checkRound, (req, res) => {
  console.log('backend probed')
  req.session.golfer = new Golfer()
  res.send('Hello' + JSON.stringify(req.session))
})

app.listen(port, () => console.log(`My Task App listening on port ${port}!`))