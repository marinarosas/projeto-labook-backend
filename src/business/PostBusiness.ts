import { PostsDatabase } from "../database/PostsDataBase"
import { UsersDatabase } from "../database/UsersDatabase"
import { CreatePostInputDTO, EditPostInputDTO, GetPostInputDTO, GetPostOutputDTO, PostDTO } from "../dtos/PostDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { Post } from "../models/Post"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { PostDB, PostWithCreatorDB } from "../types"

export class PostBusiness {
    constructor(
        private postsDatabase: PostsDatabase,
        private idGenerator: IdGenerator,
        private usersDatabase: UsersDatabase,
        private tokenManager: TokenManager
    ) { }

    public getPosts = async (input: GetPostInputDTO): Promise<GetPostOutputDTO> => {

        const { token } = input

        if (token === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("'token'inválido")
        }

        const postsWithCreatorDB: PostWithCreatorDB[] = await this.postsDatabase.getPostWithCreator()


        const posts = postsWithCreatorDB.map((postWithCreatorDB) => {
            const post = new Post(
                postWithCreatorDB.id,
                postWithCreatorDB.content,
                postWithCreatorDB.likes,
                postWithCreatorDB.dislikes,
                postWithCreatorDB.created_at,
                postWithCreatorDB.updated_at,
                postWithCreatorDB.creator_id,
                postWithCreatorDB.creator_name

            )

            return post.toBusinessModel()

        }
        )

        const output: GetPostOutputDTO = posts
        return output
    }

    public createPost = async (input: CreatePostInputDTO) => {

        // const { content, tokenUser } = input

        // const id = this.idGenerator.generate()

        // if(typeof tokenUser !== "string"){
        //     throw new BadRequestError("'token' deve ser uma string")
        // }

        // if(tokenUser === null){
        //     throw new BadRequestError("'token' deve ser informado")
        // }

        // const payload = this.tokenManager.getPayload(tokenUser)
        // console.log(payload, "AQUIIIIIIII")

        // if(payload === null){
        //     throw new BadRequestError("token não é valido")
        // }

        // const creatorId = payload.id

        // let newLikes = 0
        // let newDislikes = 0

        //1 - INSTANCIAR os dodos vindos do body
        // const newPost = new Post(
        //     id,
        //     creatorId,
        //     content,
        //     newLikes,
        //     newDislikes,
        //     new Date().toISOString(),
        //     new Date().toISOString()
        // )

        // //2 - Objeto simples para MODELAR as informações para o banco de dados
        // const newPostDB = newPost.toDBModel()

        // await this.postsDatabase.insertPost(newPostDB)

        // const postDTO = new PostDTO()
        // const output = postDTO.createPostOutput(newPost)

        // return output.toBusinessModel()
    }

    public editPost = async (input: EditPostInputDTO) => {

        const { idToEdit, content } = input

        const postDB = await this.postsDatabase.findPostById(idToEdit)

        if (!postDB) {

            throw new NotFoundError("'id' não encontrado")
        }

        // if (postDB) {
        //     const newPost = new Post(
        //         idToEdit,
        //         content,
        //         postDB.likes,
        //         postDB.dislikes,
        //         postDB.created_at,
        //         new Date().toISOString(),
        //         postDB.creator_id,
        //         postDB.
        //     )

        //     const newPostDB = newPost.toDBModel()

        //     newPost.setContentPost(newPostDB.content)

        //     await this.postsDatabase.updatePostById(newPostDB)

        //     const postDTO = new PostDTO()
        //     const output = postDTO.editPostOutput(newPost)

        //     return output.toBusinessModel()
        // }

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