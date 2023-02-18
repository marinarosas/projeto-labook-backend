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

    public createPost = async (input: CreatePostInputDTO): Promise <void> => {

        const { content, tokenUser } = input

        if (tokenUser === undefined) {
            throw new BadRequestError("'token' ausente")
        }

        if(typeof tokenUser !== "string"){
            throw new BadRequestError("'token' deve ser uma string")
        }

        if(tokenUser === null){
            throw new BadRequestError("'token' deve ser informado")
        }

        const payload = this.tokenManager.getPayload(tokenUser)

        if(payload === null){
            throw new BadRequestError("token não é valido")
        }

        // if(content !== "string"){
        //     throw new BadRequestError("'content' deve ser uma string")
        // }

        const id = this.idGenerator.generate()

        const creatorId = payload.id
        const creatorName = payload.name
        let newLikes = 0
        let newDislikes = 0

        const newPost = new Post(
            id,
            content,
            newLikes,
            newDislikes,
            new Date().toISOString(),
            new Date().toISOString(),
            creatorId,
            creatorName
        )

        const newPostDB = newPost.toDBModel()

        await this.postsDatabase.insertPost(newPostDB)
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