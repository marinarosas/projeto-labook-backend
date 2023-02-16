import { PostsDatabase } from "../database/PostsDataBase"
import { UsersDatabase } from "../database/UsersDatabase"
import { CreatePostInputDTO, EditPostInputDTO, PostDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostsDB } from "../types"

export class PostBusiness {
    constructor(
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private usersDatabase: UsersDatabase,
        private tokenManager: TokenManager
    ) { }

    public getPosts = async (q: string | undefined) => {

        const postsDatabase = new PostsDatabase()
        const postsDB: PostsDB[] = await postsDatabase.findPosts(q)

        const posts: Post[] = postsDB.map((postDB) => new Post(
            postDB.id,
            postDB.creator_id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at
        ))

        return posts
    }

    public createPost = async (input: CreatePostInputDTO) => {

        const { content, tokenUser } = input

        const id = this.idGenerator.generate()

        if(typeof tokenUser !== "string"){
            throw new BadRequestError("'token' deve ser uma string")
        }

        if(tokenUser === null){
            throw new BadRequestError("'token' deve ser informado")
        }

        const payload = this.tokenManager.getPayload(tokenUser)
        console.log(payload, "AQUIIIIIIII")

        if(payload === null){
            throw new BadRequestError("token não é valido")
        }

        const creatorId = payload.id

        let newLikes = 0
        let newDislikes = 0

        //1 - INSTANCIAR os dodos vindos do body
        const newPost = new Post(
            id,
            creatorId,
            content,
            newLikes,
            newDislikes,
            new Date().toISOString(),
            new Date().toISOString()
        )

        //2 - Objeto simples para MODELAR as informações para o banco de dados
        const newPostDB = newPost.toDBModel()

        await this.postsDatabase.insertPost(newPostDB)

        const postDTO = new PostDTO()
        const output = postDTO.createPostOutput(newPost)

        return output.toBusinessModel()
    }

    public editPost = async (input: EditPostInputDTO) => {

        const { idToEdit, content } = input

        const postsDB = await this.postsDatabase.findPostById(idToEdit)

        if (!postsDB) {

            throw new NotFoundError("'id' não encontrado")
        }

        if (postsDB) {
            const newPost = new Post(
                idToEdit,
                content,
                postsDB.likes,
                postsDB.dislikes,
                postsDB.created_at,
                new Date().toISOString(),
                postsDB.creator_id,
                postsDB.
            )

            private id: string,
            private content: string,
            private likes: number,
            private dislikes: number,
            private createdAt: string,
            private updatedAt: string,
            private creatorId: string,
            private creatorName: string

            const newPostDB = newPost.toDBModel()

            newPost.setContentPost(newPostDB.content)

            await this.postsDatabase.updatePostById(newPostDB)

            const postDTO = new PostDTO()
            const output = postDTO.editPostOutput(newPost)

            return output.toBusinessModel()
        }

    }

    public deletePost = async (id: string) => {

        const postExist = await this.postsDatabase.findPostById(id)

        if (!postExist) {

            throw new NotFoundError("Id não encontrado")
        }
        
        await this.postsDatabase.deletePost(id)

        return ({
            message: "Post deletado com sucesso"
        })

    }

}