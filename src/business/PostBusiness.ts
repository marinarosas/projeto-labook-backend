import { PostsDatabase } from "../database/PostsDataBase"
import { Post } from "../models/Post"
import { TPostsDB } from "../types"

export class PostBusiness {

    public getPosts = async (q: string | undefined) =>{

            const postsDatabase = new PostsDatabase()
            const postsDB: TPostsDB[] = await postsDatabase.findPosts(q)
    
            const posts: Post[] = postsDB.map((postDB) => new Post(
                postDB.id,
                postDB.creator_id,
                postDB.content,
                postDB.likes,
                postDB.dislikes,
                postDB.created_at,
                postDB.updated_at
            ))

            //const finalPost = await postsDatabase()

            return posts
    }

    public createPost = async (input:any) => {

        const { id, creatorId, content } = input
    
            if (typeof id !== "string") {
               
                throw new Error("'id' deve ser string")
            }
    
            if (typeof creatorId !== "string") {
               
                throw new Error("'creatorId' deve ser string")
            }

            if (typeof content !== "string") {
               
                throw new Error("'content' deve ser string")
            }
    
            const postsDatabase = new PostsDatabase()
            const postDBExist = await postsDatabase.findPostById(id)
            
            if (postDBExist) {
                throw new Error("'id' já existe")
            }
    
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
            const newPostDB: TPostsDB = {
                id: newPost.getIdPost(),
                creator_id: newPost.getCreatorIdPost(),
                content: newPost.getContentPost(),
                likes: newPost.getLikesPost(),
                dislikes: newPost.getDislikesPost(),
                created_at: newPost.getCreatedAtPost(),
                updated_at: newPost.getUpdatedAtPost()
            }
  
            postsDatabase.insertPost(newPostDB)

            return ({
                message: "Post criado com sucesso",
                post: newPost
            })
    }

    public editPost = async (input: any) => {

        const {idToEdit, content } = input

        if (typeof idToEdit !== "string") {
            
            throw new Error("'id' deve ser string")
        }

        if (typeof content !== "string") {
            
            throw new Error("'title' deve ser string")
        }

        const postsDatabase = new PostsDatabase()
        const postsDB = await postsDatabase.findPostById(idToEdit)

        if (!postsDB) {
            
            throw new Error("'id' não encontrado")
        }

        if(postsDB){
            //1 - INSTANCIAR os dodos vindos do body
            const newPost = new Post(
                idToEdit,
                postsDB.creator_id,
                content,
                postsDB.likes,
                postsDB.dislikes,
                postsDB.created_at,
                new Date().toISOString()
            )
    
            //2 - Objeto simples para MODELAR as informações para o banco de dados
            const newPostDB: TPostsDB = {
                id: newPost.getIdPost(),
                creator_id: newPost.getCreatorIdPost(),
                content: newPost.getContentPost(),
                likes: newPost.getLikesPost(),
                dislikes: newPost.getDislikesPost(),
                created_at: newPost.getCreatedAtPost(),
                updated_at: newPost.getUpdatedAtPost()
            }
    
            newPost.setContentPost(newPostDB.content)

            await postsDatabase.updatePostById(newPostDB)

            return ({
                message: "Post editado com sucesso",
                video: newPost
            })
    }


    }

    public deletePost = async (id: string) =>{
        
            const postsDatabase = new PostsDatabase()
            const postExist = await postsDatabase.findPostById(id)
    
            if (!postExist) {
               
                throw new Error("Id não encontrado")
            }
    
            await postsDatabase.deletePost(id)

            return ({
                    message: "Post deletado com sucesso"
            })
            
    }

}