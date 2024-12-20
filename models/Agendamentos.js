const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
    nomeMedico: {
        type: String,
        required: true,
    },
    especialidade: {
        type: String,
        required: true
    },
    nomeAnimal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Animal',
        required: true,
    },
    
    dataAgendamento: {
        type: Date,
        required: true,
        validate: {
            validator: function(value) {
                return value > new Date();
            },
            message: 'Data de agendamento deve ser no futuro',
        },
        
    },   
    status: {
        type: String,
        enum: ['agendado', 'cancelado', 'realizado'],
        default: 'agendado'
    },
    disponivel: {
        type: Boolean,
        default: true,
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,        
    },
}, { timestamps: true });

const Agendamento = mongoose.model('Agendamento', AgendamentoSchema);
module.exports = Agendamento;
