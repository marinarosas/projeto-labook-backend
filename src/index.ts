import express from 'express'
import cors from 'cors'
import { postRouter } from './router/postRouter'
import { userRouter } from './router/userRouter'

console.log('Hello world!')

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.use("/posts", postRouter)
app.use("/users", userRouter)