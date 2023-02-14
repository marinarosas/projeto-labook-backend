import { UsersDatabase } from "../database/UsersDatabase";
import { GetUsersInput, GetUsersOutput, LoginInput, LoginOutput, SignupInput, SignupOutput } from "../dtos/UserDTO";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { IdGenerator } from "../services/IdGenerator";
import { USER_ROLES } from "../types";

export class UserBusiness {
    constructor(
        private usersDatabase: UsersDatabase,
        private idGenerator: IdGenerator,
        // private tokenManager: TokenManager
    ) {}

    public getUsers = async (input: GetUsersInput): Promise<GetUsersOutput> => {
        const { q } = input

        if (typeof q !== "string" && q !== undefined) {
            throw new BadRequestError("'q' deve ser string ou undefined")
        }

        const usersDB = await this.usersDatabase.findUsers(q)

        const users = usersDB.map((userDB) => {
            const user = new User(
                userDB.id,
                userDB.name,
                userDB.email,
                userDB.password,
                userDB.role,
                userDB.created_at
            )

            return user.toBusinessModel()
        })

        const output: GetUsersOutput = users

        return output
    }

    public signup = async (input: SignupInput): Promise<SignupOutput> => {
        const { name, email, password } = input

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }

        if (typeof email !== "string") {
            throw new BadRequestError("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new BadRequestError("'password' deve ser string")
        }

        const id = this.idGenerator.generate()

        const newUser = new User(
            id,
            name,
            email,
            password,
            USER_ROLES.NORMAL, // só é possível criar users com contas normais
            new Date().toISOString()
        )

        const newUserDB = newUser.toDBModel()
        await this.usersDatabase.insertUser(newUserDB)

        // const tokenPayload: TokenPayload = {
        //     id: newUser.getId(),
        //     name: newUser.getName(),
        //     role: newUser.getRole()
        // }
        // const token = this.tokenManager.createToken(tokenPayload)

        const output: SignupOutput = {
            message: "Cadastro realizado com sucesso",
            token: "token"
        }

        return output
    }

    public login = async (input: LoginInput): Promise<LoginOutput> => {
        const { email, password } = input

        if (typeof email !== "string") {
            throw new Error("'email' deve ser string")
        }

        if (typeof password !== "string") {
            throw new Error("'password' deve ser string")
        }

        const userDB = await this.usersDatabase.findUserByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' não encontrado")
        }

        if (password !== userDB.password) {
            throw new BadRequestError("'email' ou 'password' incorretos")
        }

        const getToken = {
                id: userDB.id,
                name: userDB.name,
                role: userDB.role
        }

        // const token = this.tokenManager.createToken(getToken)


        const output: LoginOutput = {
            message: "Login realizado com sucesso",
            token: "token"
        }

        return output
    }
}