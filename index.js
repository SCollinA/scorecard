const {Golfer} = require('./models/Golfers')
const {Course} = require('./models/Courses')
const {CourseScore} = require('./models/CourseScores')
const {Hole} = require('./models/Holes')
const {HoleScore} = require('./models/HoleScores')
const {Group} = require('./models/Groups')

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


// all users land here initially
app.get('/login', (req, res) => {
  console.log('backend probed')
  req.session.golfer = new Golfer()
  res.send('Hello' + JSON.stringify(req.session))
})

// user attempted login
app.post('/login', (req, res) => {
  console.log('backend probed')
  req.session.golfer = new Golfer()
  res.send('Hello' + JSON.stringify(req.session))
})

// user attempted register
app.post('/register', (req, res) => {
  console.log('attempting register') 
  const name = req.body.name
  req.session.golfer = new Golfer({name})
  req.session.golfer.save(function (err) {
    if (err) return handleError(err)
  })
  res.send(`Hello ${req.session.golfer.name}`)
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