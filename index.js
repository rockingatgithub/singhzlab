// ==================================main index file entry point of app======================================

const express = require('express')
const app = express()
const port = 8000
const cookieParser = require('cookie-parser')
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo')(session)

// ====================================middlewares below========================================================

app.use(express.urlencoded())

app.use(cookieParser())

app.use(express.static('./assets'))

app.use(expressLayouts)

app.set('layout extractStyles', true)
app.set('layout extractScripts', true)

app.set('view engine', 'ejs')
app.set('views', './views')

//===================================mongo store is used to store the session even after server restarts===========
app.use(
    session({
        name: 'sanyukt',
        secret: 'blahsomething',
        saveUninitialized: false,
        resave: false,
        cookie: {
            maxAge: 1000 * 60 * 100, //in milliseconds
        },
        store: new MongoStore(
            {
                mongooseConnection: db,
                autoRemove: 'disabled',
            },
            function (err) {
                console.log(err || 'connect-mongodb setup ok')
            }
        ),
    })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)

//=================================use the router..after required middlewares called=============================

app.use('/', require('./routes'))

app.listen(port, function (err) {
    if (err) {
        console.log(`error running server on port: ${port}`)
    }
    console.log(`Server is running on port: ${port}`)
})
