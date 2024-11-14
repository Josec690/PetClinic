const express = require('express');
const router = express.Router();
const Agendamento = require('../models/Agendamentos');
const Animal = require('../models/animal');
const jwt = require('jsonwebtoken');

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Acesso negado' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified.userId;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token inválido' });
    }
};

// Rota para criar um novo agendamento
router.post('/agendar', verifyToken, async (req, res) => {
    try {
        const { nomeAnimal, dataAgendamento, especialidade } = req.body;

        // Verificar se o animal existe e pertence ao usuário
        const animal = await Animal.findOne({
            _id: nomeAnimal,
            usuario: req.user
        });

        if (!animal) {
            return res.status(404).json({ message: 'Animal não encontrado' });
        }

        // Verificar se já existe agendamento no mesmo horário
        const agendamentoExistente = await Agendamento.findOne({
            dataAgendamento,
            disponivel: false
        });

        if (agendamentoExistente) {
            return res.status(400).json({ message: 'Horário já está ocupado' });
        }

        // Determinar médico com base na especialidade
        const nomeMedico = especialidade === 'Castração' ? 'Dr. João Silva' : 'Dra. Maria Santos';

        // Criar novo agendamento
        const novoAgendamento = new Agendamento({
            nomeMedico,
            nomeAnimal: animal._id,
            tipoDeAnimal: animal.tipo,
            dataAgendamento,
            disponivel: false,
            usuario: req.user
        });

        await novoAgendamento.save();
        
        res.status(201).json({ 
            message: 'Agendamento criado com sucesso',
            agendamento: novoAgendamento
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ 
            message: 'Erro ao criar agendamento',
            error: err.message 
        });
    }
});

// Rota para listar agendamentos do usuário
router.get('/meus-agendamentos', verifyToken, async (req, res) => {
    try {
        const agendamentos = await Agendamento.find({ usuario: req.user })
            .populate('nomeAnimal')
            .sort({ dataAgendamento: 1 });

        res.json(agendamentos);
    } catch (err) {
        res.status(500).json({ message: 'Erro ao buscar agendamentos' });
    }
});

// Rota para cancelar agendamento
router.delete('/cancelar/:id', verifyToken, async (req, res) => {
    try {
        const agendamento = await Agendamento.findOne({
            _id: req.params.id,
            usuario: req.user,
        });

        if (!agendamento) {
            return res.status(404).json({ message: 'Agendamento não encontrado' });
        }

        // Verificar se o agendamento está no futuro
        if (new Date(agendamento.dataAgendamento) < new Date()) {
            return res.status(400).json({ message: 'Não é possível cancelar agendamentos passados' });
        }

        // Excluir o agendamento
        await Agendamento.deleteOne({ _id: agendamento._id });

        res.json({ message: 'Agendamento cancelado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao cancelar agendamento' });
    }
});

module.exports = router;