import { PostDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase{

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKESDISLIKES = "likes_dislikes"

    public async findPosts (q: string | undefined){

        let postDB

        if (q) {
            const result = await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).where("content", "LIKE", `%${q}%`)
            postDB = result
        } else {
            const result = await BaseDatabase.connection(PostsDatabase.TABLE_POSTS)
            postDB = result
        }

        return postDB
    }

    public async findPostById(id: string | undefined): Promise <PostDB | undefined>{
        const [postDBExist]: PostDB[] | undefined[] = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .where({id: id})
        return postDBExist
    }

    public async insertPost(newPostDB: PostDB): Promise <void>{
        await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).insert(newPostDB)

    }

    public async updatePostById(newPostDB: PostDB): Promise <void>{
        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .update(newPostDB)
        .where({id: newPostDB.id})
    }

    public async deletePost(id: string){

        await BaseDatabase
        .connection(PostsDatabase.TABLE_LIKESDISLIKES)
        .del()
        .where({post_id:id})

        await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .del()
        .where({id})    
    }
}