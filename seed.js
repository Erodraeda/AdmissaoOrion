// Rode este arquivo (node seed.js) para criar contas e locals.

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const app = express();

const User = require('./models/account');
const Order = require('./models/order');

mongoose.connect('mongodb://localhost:27017/dbAdmissao', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("Database connected");
})
.catch(err => {
    console.log("Failed to connect to Database");
    console.log(err);
})

app.use(express.urlencoded({extended: true}));

app.use(session({secret:"account", resave: false, saveUninitialized: false}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy({
    usernameField: 'email'
}, User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Criação de contas

const conta1 = new User({
    username: "Joao",
    password: "AA11!!abc123",
    email: "joao@gmail.com",
    RUT: "111222333"
})
const conta2 = new User({
    username: "Mateus",
    password: "BB22@@abc123",
    email: "mateus@gmail.com",
    RUT: "222333444"
})
const conta3 = new User({
    username: "Alice",
    password: "CC33##abc123",
    email: "alice@gmail.com",
    RUT: "333444555"
})

// Criação de conta administradora (role admin, por padrão definida como "User").
// Esse tipo de conta pode ser criada apenas por seeding.

const admin1 = new User({
    username: "Lucas",
    password: "adminABC!@12",
    email: "lucas@gmail.com",
    RUT: "123454321",
    role: "admin",
})

// Criação de Locals

const local1 = new Order({
    distribuidor: "mexico",
    linguagem: "espanhol",
    contrato: "multiplos",
    porcentagem: "30",
    placas: "10",
    jogos: ["valentinesday", "newyear", "diademuertos", "halloween", "lunarnewyear"],
    local: "Loja do Joao",
    cidade: "Imbe",
    sku: "MEX-ESP-10-VaNeDiHaLu"
})
const local2 = new Order({
    distribuidor: "eua",
    linguagem: "ingles",
    contrato: "unico",
    porcentagem: "10",
    placas: "3",
    jogos: ["newyear"],
    local: "Bar do Mateus",
    cidade: "Tramandai",
    sku: "EUA-ING-03-Ne"
})
const local3 = new Order({
    distribuidor: "chile",
    linguagem: "espanhol",
    contrato: "multiplos",
    porcentagem: "30",
    placas: "6",
    jogos: ["thanksgiving", "eastersunday", "diademuertos"],
    local: "Loja",
    cidade: "Imbe",
    sku: "CHI-ESP-06-ThEaDi"
})

// Adição de seeds à database

function createAccount1(conta1) {
    try {
        const {username, password, email, RUT} = conta1;
        const user = new User({username, email, RUT});
        const registeredUser = User.register(user, password);
        console.log(registeredUser);
        } catch (e) {
        console.log(e);
    }
}

function createAccount2(conta2) {
    try {
        const {username, password, email, RUT} = conta2;
        const user = new User({username, email, RUT});
        const registeredUser = User.register(user, password);
        console.log(registeredUser);
        } catch (e) {
        console.log(e);
    }
}

function createAccount3(conta3) {
    try {
        const {username, password, email, RUT} = conta3;
        const user = new User({username, email, RUT});
        const registeredUser = User.register(user, password);
        console.log(registeredUser);
        } catch (e) {
        console.log(e);
    }
}

function createAdmin1(admin1) {
    try {
        const {username, password, email, RUT, role} = admin1;
        const user = new User({username, email, RUT, role});
        const registeredUser = User.register(user, password);
        console.log(registeredUser);
        } catch (e) {
        console.log(e);
    }
}

createAccount1(conta1);
createAccount2(conta2);
createAccount3(conta3);
createAdmin1(admin1);

Order.insertMany([local1, local2, local3])
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })