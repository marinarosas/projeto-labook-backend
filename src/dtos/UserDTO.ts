// import { UserModel } from "../types"

// export interface GetUsersInputDTO {
//     q: unknown
// }

// export type GetUsersOutput = UserModel[]

export interface SignupInputDTO {
    name: unknown,
    email: unknown,
    password: unknown
}

export interface SignupOutputDTO {
    token: string
}

export interface LoginInputDTO {
    email: unknown,
    password: unknown
}

export interface LoginOutputDTO {
    token: string
}