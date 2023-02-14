import { TUsersDB, UserModel, USER_ROLES } from "../types"

export class User {
    constructor (
        private id: string,
        private name: string,
        private email: string,
        private password: string,
        private role: USER_ROLES,
        private createdAt: string
    ) {}

    getIdUser(): string {
        return this.id
    }

    getNameUser(): string{
        return this.name
    }

    setNameUser(value: string): void{
        this.name = value
    }

    getEmailUser(): string{
        return this.email
    }

    setEmailUser(value: string): void{
        this.email = value
    }

    getPasswordUser(): string{
        return this.password
    }

    setPasswordUser(value: string): void{
        this.password = value
    }

    getRoleUser(): USER_ROLES{
        return this.role
    }

    setRoleUser(value: USER_ROLES): void{
        this.role = value
    }

    getCreatedAtUser(): string {
        return this.createdAt
    }

    setCreatedAtUser(value: string){
        this.createdAt = value
    }

    public toDBModel(): TUsersDB {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            created_at: this.createdAt
        }
    }

    public toBusinessModel(): UserModel {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            role: this.role,
            createdAt: this.createdAt
        }
    }
    
}