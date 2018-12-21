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

// user attempted login
app.post('/login', (req, res) => {
  console.log('attempting login')
  const name = req.body.name
  req.session.golfer = Golfer.findOne({name})
  res.redirect('/clubhouse')
})

// user attempted register
app.post('/register', (req, res) => {
  console.log('attempting register') 
  const name = req.body.name
  req.session.golfer = new Golfer({name})
  req.session.golfer.save(function (err) {
    if (err) return handleError(err)
  })
  res.redirect('/clubhouse')
})

app.post('/logout', (req, res) => {
  console.log('logging out')
  req.session.destroy(err => {
    console.log(err)
    res.redirect('/login')
  })
})

// user logged in
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