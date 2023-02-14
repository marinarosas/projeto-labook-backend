import express from 'express'
import { PostBusiness } from '../business/PostBusiness'
import { PostController } from '../controller/PostController'
import { PostsDatabase } from '../database/PostsDataBase'
import { UsersDatabase } from '../database/UsersDatabase'
import { IdGenerator } from '../services/IdGenerator'

export const postRouter = express.Router()

const postController = new PostController(
    new PostBusiness(
        new PostsDatabase,
        new IdGenerator,
        new UsersDatabase
    )
)

postRouter.get("/", postController.getPosts)
postRouter.post("/", postController.createPost)
postRouter.put("/:id", postController.editPost)
postRouter.delete("/:id", postController.deletePost)