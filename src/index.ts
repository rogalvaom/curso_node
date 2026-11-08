import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import 'module-alias/register'
import routes from '@/routes'

dotenv.config()

const port = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(cors())
app.use(routes)
// app.listen(port, () => {
app.listen(port, function () {
    console.log(`servidor executando na porta ${port}`)
})