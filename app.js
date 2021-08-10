// Importando Express, Mongoose, Passport e Password-Validator

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// Definindo modelo de conta para autenticação

const User = require('./models/account');

lowercase(2).symbols(2)

// Conectando ao database

mongoose.connect('mongodb://localhost:27017/dbAdmissao', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Database connected");
})
.catch(err => {
    console.log("Failed to connect to Database");
    console.log(err);
})

// Definindo pathing, directory de statics, view engine

const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));

// Definindo sessões e criptografia

app.use(express.urlencoded({extended: true}));

app.use(session({secret:'account', resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Definição de autenticação

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.session.returnTo = req.originalUrl;
    res.redirect("/login");
}

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
})

// Rotas

app.get('/register', (req, res) => {
    res.render('register');
})

app.post('/register', async (req, res) => {
    try {
        const {username, password, email, RUT} = req.body;
        const user = new User({username, email, RUT});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
        })
    } catch (e) {
        console.log(e);
        res.redirect("/register");
    }

    res.redirect('/home');
    
})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/', (req, res) => {
    res.redirect('/home');
})

app.get('/home', (req, res) => {
    res.render('home');
})

app.listen(3000, () => {
    console.log("server up");
});