import express from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { PostsDatabase } from '../database/PostsDataBase'

export const userRouter = express.Router()

// const postController = new PostController(
//     new PostBusiness(
//         new PostsDatabase
//     )
// )

userRouter.post("/", postController.getPosts)
userRouter.post("/", postController.createPost)
