import { BadRequestError } from "../errors/BadRequestError"
import { Post } from "../models/Post"

export interface CreatePostInputDTO {
    id: string,
    creatorId: string,
    content: string
}

export interface CreatePostOutputDTO {
    message: string,
    post: {
        id: string,
        creatorId: string,
        content: string,
        newLikes: number,
        newDislikes: number,
        createdAt: string,
        updatedAt: string
    }
}

export interface EditPostInputDTO {
    idToEdit: string,
    content: string
}

export interface EditPostOutputDTO {
    message: string,
    post: {
        idToEdit: string,
        creatorId: string,
        content: string,
        likes: number,
        dislikes: number,
        createdAt: string,
        updatedAt: string
    }
}

export class PostDTO {

    public createPostInput(
        id: unknown,
        creatorId: unknown,
        content: unknown
    ): CreatePostInputDTO {

        if (typeof id !== "string") throw new BadRequestError("'id' deve ser string")

        if (typeof creatorId !== "string") throw new BadRequestError("'creatorId' deve ser string")


        if (typeof content !== "string") throw new BadRequestError("'content' deve ser string")

        const dto: CreatePostInputDTO = {
            id,
            creatorId,
            content
        }

        return dto
    }

    public createPostOutput(post: Post): CreatePostOutputDTO {
        const dto: CreatePostOutputDTO = {
            message: "Post criado com sucesso",
            post: {
                id: post.getIdPost(),
                creatorId: post.getCreatorIdPost(),
                content: post.getContentPost(),
                newLikes: post.getLikesPost(),
                newDislikes: post.getDislikesPost(),
                createdAt: post.getCreatedAtPost(),
                updatedAt: post.getUpdatedAtPost()

            }
        }

        return dto
    }

    public editPostInput(
        idToEdit: unknown | undefined,
        content: unknown | undefined
    ): EditPostInputDTO {

        if (typeof idToEdit !== "string") throw new BadRequestError("'id' deve ser string")


        if (typeof content !== "string") throw new BadRequestError("'title' deve ser string")

        const dto = {
            idToEdit,
            content
        }

        return dto

    }

    public editPostOutput(post: Post): EditPostOutputDTO {
        const dto: EditPostOutputDTO = {
            message: "Post editado com sucesso",
            post: {
                idToEdit: post.getIdPost(),
                creatorId: post.getCreatorIdPost(),
                content: post.getContentPost(),
                likes: post.getLikesPost(),
                dislikes: post.getDislikesPost(),
                createdAt: post.getCreatedAtPost(),
                updatedAt: post.getUpdatedAtPost()
            }
        }

        return dto
        
    }
}