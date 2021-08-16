// Importando Express, Mongoose, Passport e Password-Validator

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const app = express();

// Definindo modelo de conta para autenticação

const User = require('./models/account');
const Order = require('./models/order');

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

app.use(session({secret:"account", resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email'},
    User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Definição de autenticação

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
            if (err) {
                console.log(err);
                return next(err);
            }
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

app.post('/login', passport.authenticate("local", {failureRedirect: "/login"}), (req,res) => {
    const redirectUrl = req.session.returnTo || "/home";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
})

app.get('/local_order', async (req, res) => {
    res.render('localorder');
})

app.post('/local_order', async (req, res) => {
    try {
        const { distribuidor, linguagem, placas, jogos, local, cidade } = req.body;
        var porcentagem;
        var contrato;
        if (jogos.length > 1) {
            porcentagem = 30;
            contrato = 'multiplos';
        }
        else if (jogos.length == 1) {
            porcentagem = 10;
            contrato = 'unico';
        }
        var sku = "";
        if (distribuidor == 'eua') sku += 'EUA';
        else if (distribuidor == 'mexico') sku += 'MEX';
        else if (distribuidor == 'chile') sku += 'CHI';
        sku += '-';
        if (linguagem == 'ingles') sku += 'ING';
        else if (linguagem == 'espanhol') sku += 'ESP';
        sku += '-';
        if (placas == 1) sku += '01';
        else if (placas == 2) sku += '02';
        else if (placas == 3) sku += '03';
        else if (placas == 4) sku += '04';
        else if (placas == 5) sku += '05';
        else if (placas == 6) sku += '06';
        else if (placas == 7) sku += '07';
        else if (placas == 8) sku += '08';
        else if (placas == 9) sku += '09';
        else if (placas == 10) sku += '10';
        sku += '-';
        for (var i = 0; i < 5; i ++) {
            if (jogos[i] == 'halloween') sku += 'H';
            else if (jogos[i] == 'valentinesday') sku += 'V';
            else if (jogos[i] == 'eastersunday') sku += 'E';
            else if (jogos[i] == 'newyear') sku += 'N';
            else if (jogos[i] == 'lunarnewyear') sku += 'L';
            else if (jogos[i] == 'thanksgiving') sku += 'T';
            else if (jogos[i] == 'diademuertos') sku += 'D';
        }
        const newOrder = new Order( {distribuidor, linguagem, contrato, porcentagem, placas, jogos, local, cidade, sku} );
        await newOrder.save();
    } catch (err) {
        console.log(err);
    }
    
    res.redirect('/home');
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