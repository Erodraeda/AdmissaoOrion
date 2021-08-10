const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Account Schema para autenticação e registro de contas

const accountSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    RUT: {
        type: String,
        required: true,
        unique: true
    },    
})

// Exportação do Schema para o sistema de autenticação

accountSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Account", accountSchema);