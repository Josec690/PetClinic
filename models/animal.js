const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true,
    },
    raca: {
        type: String,
        required: true,        
    },
    rga: {
        type: String,
        required: true,
        unique: true,
    },
    idade: {
        type: Number,
        required: true,        
    },
    peso: {
        type: String,
        required: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    data: {
        type: Date,
        default: Date.now,
    },    
});

// Middleware para cascading delete
animalSchema.pre('remove', function(next) {  // Remove todos os animais do usuário
    this.model('User').updateOne(            // Atualiza o usuário
        { _id: this.usuario },               // Filtra pelo usuário
        { $pull: { animais: this._id } },    // Remove o animal do array de animais
        { multi: true },                     // Remove todos os animais
        next                                 // Chama o próximo middleware
    );
});


const Animal = mongoose.model('Animal', animalSchema) // Cria o modelo de animal
module.exports = Animal                               // Exporta o modelo de animal
