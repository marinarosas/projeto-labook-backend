import express, { Request, Response } from 'express'
import cors from 'cors'
import { PostController } from './controller/PostController'

console.log('Hello world!')

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

const postDatabase = new PostController()

app.get("/posts", postDatabase.getPosts)

app.post("/posts", postDatabase.createPost)

app.put("/post/:id", postDatabase.editPost)

// app.delete("/posts/:id", postDatabase.deletePost)