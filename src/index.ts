import express, { Request, Response } from 'express'
import cors from 'cors'
import { PostController } from './controller/PostController'
import { postRouter } from './router/postRouter'

console.log('Hello world!')

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.use("/posts", postRouter)