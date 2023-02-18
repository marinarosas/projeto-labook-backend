import { PostDB, PostWithCreatorDB } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class PostsDatabase extends BaseDatabase {

    public static TABLE_POSTS = "posts"
    public static TABLE_LIKESDISLIKES = "likes_dislikes"

    public async findPosts(q: string | undefined) {

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

    public async findPostById(id: string | undefined): Promise<PostDB | undefined> {
        const postDBExist: PostDB[] | undefined[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .select()
            .where({ id: id })
        return postDBExist[0]
    }

    public async insertPost(newPostDB: PostDB): Promise<void> {
        await BaseDatabase.connection(PostsDatabase.TABLE_POSTS).insert(newPostDB)

    }

    public async updatePostById(id: string, newPostDB: PostDB): Promise<void> {
        await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .update(newPostDB)
            .where({id})
    }

    public async deletePost(id: string) {

        await BaseDatabase
            .connection(PostsDatabase.TABLE_LIKESDISLIKES)
            .del()
            .where({ post_id: id })

        await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .del()
            .where({ id })
    }

    public getPostWithCreator = async () => {
        const result: PostWithCreatorDB[] = await BaseDatabase
            .connection(PostsDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"

            )
            .join("users", "posts.creator_id", "=", "users.id")

        return result
    }
}