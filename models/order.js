const mongoose = require('mongoose');

// Order Schema para registros de novas ordens

const orderSchema = new mongoose.Schema({
    distribuidor: {
        type: String,
        required: true
    },
    linguagem: {
        type: String,
        required: true
    },
    contrato: {
        type: String,
        required: true
    },
    porcentagem: {
        type: String,
        required: true
    },
    placas: {
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    jogos: {
        type: String[5],
        required: true,
        max: 5,
    },
    local: {
        type: String,
        required: true,
        maxLength: 30
    },
    cidade: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true
    }
})

// Exportação do Schema para o sistema de autenticação

module.exports = mongoose.model("LocalOrder", orderSchema);

    // - campos requiridos:
    // - Distribuidor: EUA, México, Chile
    // - Linguagem: Inglês, Espanhol
    // - Contrato: Jogos multíplos, Único jogo
    // - Porcentagem: Para jogos multíplos 30%, para único 10%
    // - Quantidade de placas: até 10 por local
    // - Jogos: "Halloween", "Valentine's day", "Easter Sunday", "New Year", "Lunar New Year", "Thanksgiving", "Día de Muertos"
    // - Limite de 5 jogos por local
    // - Nome do local: até 30 caracteres
    // - Cidade