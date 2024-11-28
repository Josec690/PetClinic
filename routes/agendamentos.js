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
            disponivel: false,
            status: 'agendado' // Adicionar verificação de status
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
            dataAgendamento,
            especialidade,
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
        // Pegar a data atual com hora atual
        const agora = new Date();

        // Pegar a data atual no início do dia
        const hoje = new Date();
        hoje.setHours(0, 0, 0, 0);

        const agendamentos = await Agendamento.find({ 
            usuario: req.user,
            status: 'agendado',
            $or: [
                // Agendamentos futuros
                { dataAgendamento: { $gt: agora } },
                // Agendamentos de hoje que ainda não passaram
                {
                    dataAgendamento: {
                        $gte: hoje,
                        $gte: agora
                    }
                }
            ]
        })
        .populate('nomeAnimal')
        .sort({ dataAgendamento: 1 });
            
        // Filtrar agendamentos com animais excluídos e atualizar seus status
        const agendamentosFiltrados = [];
        for (let agendamento of agendamentos) {
            if (!agendamento.nomeAnimal) {
                // Se o animal não existe mais, atualizar o status do agendamento
                await Agendamento.findByIdAndUpdate(agendamento._id, {
                    status: 'cancelado',
                    disponivel: true
                });
                continue;
            }
            // Verificar se o horário do agendamento já passou
            const dataAgendamento = new Date(agendamento.dataAgendamento);
            if (dataAgendamento < agora) {
                // Atualizar status para 'realizado' se o horário já passou
                await Agendamento.findByIdAndUpdate(agendamento._id, {
                    status: 'realizado'
                });
                continue;
            }
            agendamentosFiltrados.push(agendamento);
        }

        // Retornar os agendamentos filtrados e a contagem
        res.json({
            totalAgendamentos: agendamentosFiltrados.length,
            agendamentos: agendamentosFiltrados
        });
    } catch (err) {
        console.error('Erro ao buscar agendamentos:', err);
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
        const agora = new Date();
        if (new Date(agendamento.dataAgendamento) <= agora) {
            return res.status(400).json({ message: 'Não é possível cancelar agendamentos passados ou em andamento' });
        }

        // Atualizar o status do agendamento
        await Agendamento.findByIdAndUpdate(agendamento._id, {
            status: 'cancelado',
            disponivel: true
        });

        res.json({ message: 'Agendamento cancelado com sucesso' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao cancelar agendamento' });
    }
});

module.exports = router;