const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Account Schema para autenticação e registro de contas

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    RUT: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: "user",
        enum: ['user', 'admin']
    }
})

// Exportação do Schema para o sistema de autenticação

accountSchema.plugin(passportLocalMongoose, { usernameField : 'email' });

module.exports = mongoose.model("Account", accountSchema);