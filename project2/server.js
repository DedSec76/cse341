require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const connectDB = require('./database/connect');

const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy;

const app = express();
connectDB();

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "My management APIs",
        version: "1.0.0",
        description: "These APIs are used to manage personal expense data. \n\nAnd also to manage a collection of movies you enjoy."
      }
    },
    apis: ["./routes/*.js"]
}

const specs = swaggerJsdoc(options)

app.use(cors())
app.use(express.json())

// Using express session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))

// Initialize passport js
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/', require('./routes'));


// Using passport js with github auth
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  return done(null, profile);
}
))

// passport functions
passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

// Routes post for passport
app.get('/', (req, res) => { 
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out') 
})

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/')
  }
);

const host = process.env.HOST;
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Start the Sercer ${host}:${port}`)
})