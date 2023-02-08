import { Request, Response } from "express"
import { PostBusiness } from "../business/PostBusiness"
// import { PostsDatabase } from "../database/PostsDataBase"
// import { Post } from "../models/Post"
// import { TPostsDB } from "../types"

export class PostController{

    public getPosts = async (req: Request, res: Response) => {
        try {
            const q = req.query.q as string | undefined
    
            const postBusiness = new PostBusiness()
            const output = await postBusiness.getPosts(q)
        
            res.status(200).send(output)
    
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
    }

    public createPost = async (req: Request, res: Response) => {
        try {
    
            const input = {
                id: req.body.id,
                creatorId: req.body.creatorId,
                content: req.body.content
            }

            const postBusiness = new PostBusiness()
            const output = await postBusiness.createPost(input)
           
            res.status(201).send(output)

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
    }

    public editPost = async (req: Request, res: Response) => {
        try {
            
            const input = {
                idToEdit: req.params.id,
                content: req.body.content
            }
            
            const postBusiness = new PostBusiness()
            const output = await postBusiness.editPost(input)
    
                res.status(201).send(output)            

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
    }

    public deletePost = async (req: Request, res: Response) => {
        try {
            const id = req.params.id
    
            const postDatabase = new PostBusiness()
            const output = await postDatabase.deletePost(id)
    
            res.status(200).send(output)
    
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
    }
}