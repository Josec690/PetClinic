const mongoose = require('mongoose')
require('dotenv').config({
  path: process.env.NODE_ENV === 'development'
    ? '.env.development'
    : '.env.production' 
})

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB conectado: ${conn.connection.host} (${process.env.NODE_ENV})`)
    return conn
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message)
    throw err
  }
}

module.exports = connectDB