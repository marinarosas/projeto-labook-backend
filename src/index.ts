import express, { Request, Response } from 'express'
import cors from 'cors'
// import { db } from './database/knex'
import { TCreatePurchase, TEditPurchase, TProduct, TPurchase, TPurchasePaid, TUsers, TUsersEdit } from '../src/types'

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

//############ REGEX ############

const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,12}$/g

//############ USERS ############

//##createUser
app.post("/users", async (req: Request, res: Response) => {

    try {
        const { id, name, email, password } = req.body as TUsers

        const newUser: TUsers = {
            id,
            name,
            email,
            password
        }

        if (!id || !name || !email || !password) {
            res.status(404)
            throw new Error("Faltou escrever o Id, name, email ou password.")
        }

        if (typeof id !== "string") {
            res.status(400)
            throw new Error("O tipo da Id deve ser uma string")
        }

        if (id[0] !== "u") {
            res.status(400)
            throw new Error("O id deve iniciar com a letra 'u'")
        }

        if (typeof name !== "string") {
            res.status(400)
            throw new Error("O tipo da name deve ser uma string")
        }

        if (typeof email !== "string") {
            res.status(400)
            throw new Error("O tipo do e-mail deve ser uma string")
        }

        if (typeof password !== "string") {
            res.status(400)
            throw new Error("O tipo do password é uma string")
        }

        const [searchIdUser]: TUsers[] = await db("users").where({ id: newUser.id })

        const [searchEmail]: TUsers[] = await db("users").where({ email: newUser.email })

        if (searchIdUser) {
            res.status(400)
            throw new Error("Id já cadastrado.")
        }

        if (searchEmail) {
            res.status(400)
            throw new Error("Email já cadastrado.")
        }
        if (!email.match(regexEmail)) {
            throw new Error("Parâmetro 'email' inválido")
        }

        if (!password.match(regexPassword)) {
            res.status(400)
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        if (!searchIdUser || !searchEmail) {
            await db("users").insert(newUser)
            res.status(201).send({ message: "Cadastro realizado com sucesso" })
        }

    } catch (error: any) {
        console.log(error)

        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// ## Get All Users
app.get("/users", async (req: Request, res: Response) => {

    try {

        const result: TUsers = await db('users')
        res.status(200).send(result)

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// ## Edit User by id
app.put("/users/:id", async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        const newName = req.body.name
        const newEmail = req.body.email
        const newPassword = req.body.password

        const [user]: TUsers[] = await db("users").where({ id: id })

        if (id[0] !== "u") {
            res.status(400)
            throw new Error("O id deve inicar com 'u'")
        }

        if (typeof newName !== "string") {
            res.status(400)
            throw new Error("O tipo da name deve ser uma string")
        }

        if (typeof newEmail !== "string") {
            res.status(400)
            throw new Error("O tipo do e-mail deve ser uma string")
        }

        if (typeof newPassword !== "string") {
            res.status(400)
            throw new Error("O tipo do password é uma string")
        }

        if (!newEmail.match(regexEmail)) {
            throw new Error("Parâmetro 'email' inválido")
        }

        if (!newPassword.match(regexPassword)) {
            res.status(400)
            throw new Error("'password' deve possuir entre 8 e 12 caracteres, com letras maiúsculas e minúsculas e no mínimo um número e um caractere especial")
        }

        const editUser: TUsersEdit = {
            name: newName || user.name,
            email: newEmail || user.email,
            password: newPassword || user.password
        }

        if (user) {

            await db("users").update(editUser).where({ id: id })

        } else {
            res.status(400)
            throw new Error("Usuário não cadastrado.")
        }

        res.status(200).send({ message: "Cadastro atualizado com sucesso" })

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})

// ## Delete User by id
app.delete("/users/:id", async (req: Request, res: Response) => {

    try {
        const id = req.params.id

        if (id[0] !== "u") {
            res.status(400)
            throw new Error("O id deve inicar com 'u'")
        }

        const [userExist]: TUsers[] = await db("users").where({ id: id })

        const [userHavePurchase]: TPurchase[] = await db("purchases").where({ buyer: id })

        if (userExist) {
            if (userHavePurchase) {
                await db("purchases").del().where({ buyer: id })
                await db("purchases_products").del().where({ purchase_id: userHavePurchase.id })
                await db("users").del().where({ id: id })
            } else {
                await db("users").del().where({ id: id })
            }

            res.status(200).send({ message: "Usuário apagado com sucesso" })

        } else {
            res.status(400)
            throw new Error("Usuário não existe")
        }

    } catch (error: any) {
        console.log(error)
        if (res.statusCode === 200) {
            res.status(500)
        }
        res.send(error.message)
    }
})