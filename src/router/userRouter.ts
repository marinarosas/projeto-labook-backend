import express from 'express'
import { UserBusiness } from '../business/UserBusiness'
import { UserController } from '../controller/UserController'
import { UsersDatabase } from '../database/UsersDatabase'
import { IdGenerator } from '../services/IdGenerator'

export const userRouter = express.Router()

const userController = new UserController(
    new UserBusiness(
        new UsersDatabase,
        new IdGenerator
    )
)

userRouter.get("/", userController.getUsers)
userRouter.post("/signup", userController.signup)
userRouter.post("/login", userController.login)
