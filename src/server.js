const express = require('express')
const app = express()

const perguntasRoutes = require('./routes/perguntasRoutes')
const respostasRoutes = require('./routes/respostasRoutes')

require('dotenv').config()

app.use(express.json())

app.use('/perguntas', perguntasRoutes)
app.use('/respostas', respostasRoutes)

app.listen(process.env.PORT, () => {
    console.log(`Server Backend: http://localhost:${process.env.PORT}`)
})