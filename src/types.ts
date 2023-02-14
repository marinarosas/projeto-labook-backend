export enum USER_ROLES {
    NORMAL = "NORMAL",
    ADMIN = "ADMIN"
}

export interface TPostsDB {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string
}

export interface TGetPost {
    id: string,
    creator_id: string,
    content: string,
    likes: number,
    dislikes: number,
    created_at: string,
    updated_at: string,
    creator: TCreator
}

export interface TCreator {
    id: string,
    name: string
}

export interface TUsersDB {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    created_at: string
}

export interface UserModel {
    id: string,
    name: string,
    email: string,
    password: string,
    role: string,
    createdAt: string
}