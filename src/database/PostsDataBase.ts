import { TPostsDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase{

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKESDISLIKES = "likes_dislikes"

    public async findPosts (q: string | undefined){

        let postsDB

        if (q) {
            const result = await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).where("content", "LIKE", `%${q}%`)
            postsDB = result
        } else {
            const result = await BaseDatabase.connection(PostsDatabase.TABLE_POSTS)
            postsDB = result
        }

        return postsDB
    }

    public async findPostById(id: string | undefined): Promise <TPostsDB | undefined>{
        const [postDBExist]: TPostsDB[] | undefined[] = await BaseDatabase
        .connection(PostsDatabase.TABLE_POSTS)
        .where({id: id})
        return postDBExist
    }

    public async insertPost(newPostDB: TPostsDB): Promise <void>{
        await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).insert(newPostDB)

    }

    public async updatePostById(newPostDB: TPostsDB): Promise <void>{
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