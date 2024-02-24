const express = require('express');
const cookieParser = require('cookie-parser')
const app = express();
const port = 8000;
const expressLayouts = require('express-ejs-layouts')
const db = require('./config/mongoose')
// const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash')
const customMware = require('./config/middleware')

app.use(sassMiddleware({
    src : './assets/scss',
    dest : './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))

app.use(express.static('./assets'))

app.use(expressLayouts)

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use('/uploads', express.static(__dirname + '/uploads'))

app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(session({
    name: 'codeial',
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (10 * 1000 * 60)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codeial_development',
        autoRemove: 'disabled'
    }),
    function(err) {
        console.log(err || 'connect-mongo setup ok')
    }
}));

app.use(passport.initialize())
app.use(passport.session())

app.use(passport.setAuthenticatedUser)

app.use(flash())
app.use(customMware.setFlash)

const router = app.use('/', require('./routes'))

app.listen(port, function (err) {
    if (err) {
        console.log(`err while running the port : ${err}`);
        return;
    }
    console.log(`server is running perfectly on port : ${port}`);
})