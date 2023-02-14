export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export type TPostsDB ={
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export type TGetPost = {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: TCreator
}

export type TCreator = {
        id: string,
        name: string
}

export type TUsersDB = {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string 
}