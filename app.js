const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const connectDB = require('./config/database')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const agendamentoRoutes = require('./routes/agendamentos')
const cookieParser = require('cookie-parser')
const User = require('./models/User')
require('dotenv').config()

const app = express()

// Conectar ao MongoDB
connectDB()



app.use(bodyParser.urlencoded({ extended: false })) //  Middleware para analisar os dados do formulário
app.use(bodyParser.json()) // Middleware para analisar os dados JSON
app.use(cookieParser()) // Middleware para analisar cookies

// Servindo arquivos estáticos (CSS, JS, Imagens)
app.use(express.static(path.join(__dirname, 'public'))) // Corrigido o uso do path.join
app.use(express.static(path.join(__dirname, 'views')))  // Se você quiser servir os arquivos estáticos da pasta views

// Configurar o mecanismo de template EJS
app.set('view engine', 'ejs') // Definir o mecanismo de visualização como EJS

// Definir o diretório de views (opcional, se for diferente de 'views')
app.set('views', path.join(__dirname, 'views'))

// Rotas para renderizar as páginas EJS
app.get('/cadastrar', (req, res) => {
    res.render('p-00cadastrar') // Renderizando o EJS sem extensão
})

app.get('/cadastrarAnimal', (req, res) => {
    res.render('p-07AnimalCadastro')
})

app.get('/login', (req, res) => {
    res.render('p-01login') // Certifique-se de que este arquivo existe em "views"
})

app.get('/recuperar', (req, res) => {
    res.render('p-002recuperar')
})

app.get('/', (req, res) => {
    res.render('index') // Assumindo que você tem um index.ejs na pasta views
})

app.get('/usuario', (req, res) => {
    res.render('p-03User')
})


app.get('/perfil', (req, res) => {
    res.redirect('/user/perfil')
})

app.get('/agendar', (req, res) => {
    res.render('p-08agendamento')
})


app.get('/reset/:token', async (req, res) => {
    try {
        // Verifique se o token é válido e se não expirou
        const usuario = await User.findOne({
            resetPasswordToken: req.params.token,
            resetPasswordExpires: { $gt: Date.now() }
        })

        if (!usuario) {
            return res.status(400).json({ msg: 'Token inválido ou expirado' })
        }      
        
        // Renderizar a página de nova senha, passando o email e o token para o formulário
        res.render('p-06novasenha', { email: usuario.email, token: req.params.token })
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Erro no servidor')
    }
})

// Definindo a rota de autenticação

app.use('/auth', authRoutes)
app.use('/user', userRoutes)  // Usando as rotas do usuário
app.use('/api/auth', authRoutes) // 
app.use('/agendamentos', agendamentoRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Algo deu errado!')
})
// Porta do servidor
const PORT = process.env.PORT || 5500
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))
